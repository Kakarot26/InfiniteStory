# 📖 InfiniteStory Revamp

An AI-powered interactive story platform where every choice branches into a truly infinite narrative. Built from scratch with Node.js, Express, and the Groq API (Llama 3.3 70b).

> This is a from-scratch rebuild — written and learned hands-on.

## Current Status

- [x] Phase 1 — Express server with Groq API integration
- [x] Phase 2 — Dynamic prompts with genre, character, and history
- [ ] Phase 3 — React frontend
- [ ] Phase 4 — Full game loop
- [ ] Phase 5 — UI polish and deployment

## Tech Stack

- **Backend** — Node.js, Express
- **AI** — Groq API (Llama 3.3 70b)
- **Frontend** — React + Vite (coming soon)

## Local Setup

### Backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
GROQ_API_KEY=your_key_here
```

Then run:
```bash
node server.js
```

Server runs on `http://localhost:8000`

## API

### POST `/api/story`
Returns an AI-generated story response.

```json
{
  "model": "llama-3.3-70b-versatile",
  "messages": [{ "role": "user", "content": "Write a short story" }]
}
```

**Response:** Plain story text string.
