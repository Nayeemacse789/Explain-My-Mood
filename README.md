# ExplainMyMood

An AI-powered mood and emotion detection app from text and voice input.

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
