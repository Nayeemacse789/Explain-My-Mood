# ExplainMyMood

An AI-powered mood and emotion detection app from text and voice input.
Key Features
Feature	Description
 Voice-to-text	Transcribes speech input using Whisper or a similar ASR model
 Text Analysis	Analyzes sentiment (positive/negative/neutral) and specific emotions (anger, joy, fear, etc.)
 Mood Visualizer	Translates results into animated visuals (e.g., color auras, face changes)
 Emotion Trends	Tracks mood over time and plots charts (Radar, Line, Heatmap)
 LLM Explanation	Uses an LLM (e.g., GPT) to explain why the model thinks you're feeling that way
 Private Diary Mode	Stores entries locally or in the cloud for personal journaling


## Features

- Voice and text input support
- Emotion analysis using DistilBERT
- Sentiment explanation using OpenAI GPT API
- Voice-to-text via Whisper
- Visual mood representation

## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: FastAPI + Python ML models
- ML: DistilBERT, Whisper, OpenAI GPT

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
