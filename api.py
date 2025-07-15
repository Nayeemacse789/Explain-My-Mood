
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import whisper
import torch
from transformers import pipeline
import openai
import os
from tempfile import NamedTemporaryFile
from pydub import AudioSegment

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
emotion_classifier = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion", return_all_scores=True)
whisper_model = whisper.load_model("base")

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class TextInput(BaseModel):
    text: str

@app.post("/analyze_text")
def analyze_text(input: TextInput):
    results = emotion_classifier(input.text)[0]
    top_emotion = max(results, key=lambda x: x["score"])
    return {"emotions": results, "top_emotion": top_emotion}

@app.post("/explain_emotion")
def explain_emotion(input: TextInput):
    prompt = f"Given the following text:

"{input.text}"

Explain why the person might be feeling a certain emotion based on the words used."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    explanation = response.choices[0].message.content
    return {"explanation": explanation}

@app.post("/transcribe_audio/")
async def transcribe_audio(file: UploadFile = File(...)):
    suffix = "." + file.filename.split(".")[-1]
    with NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_file.write(await file.read())
        temp_filepath = temp_file.name

    # Convert to wav if needed
    if not temp_filepath.endswith(".wav"):
        audio = AudioSegment.from_file(temp_filepath)
        wav_path = temp_filepath + ".wav"
        audio.export(wav_path, format="wav")
        temp_filepath = wav_path

    result = whisper_model.transcribe(temp_filepath)
    os.remove(temp_filepath)
    return {"transcription": result["text"]}
