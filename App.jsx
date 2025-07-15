
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [transcription, setTranscription] = useState('');

  const handleTextSubmit = async () => {
    const response = await axios.post('http://localhost:8000/analyze_text', { text });
    setEmotions(response.data.emotions);

    const explanationRes = await axios.post('http://localhost:8000/explain_emotion', { text });
    setExplanation(explanationRes.data.explanation);
  };

  const handleAudioUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const response = await axios.post('http://localhost:8000/transcribe_audio/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setTranscription(response.data.transcription);
    setText(response.data.transcription);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎭 ExplainMyMood</h1>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />
      <div className="flex gap-2 mb-4">
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button
          onClick={handleTextSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze Mood
        </button>
      </div>
      {transcription && <p className="italic mb-2">🗣️ Transcribed: "{transcription}"</p>}
      {emotions.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Detected Emotions</h2>
          <ul className="list-disc ml-5">
            {emotions.map((e, idx) => (
              <li key={idx}>
                {e.label}: {(e.score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
      {explanation && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-medium mb-1">🧠 GPT Explanation:</h3>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
