# Media Downloader

A modern full-stack media downloader built with **Next.js**, **Express**, **TypeScript**, **Docker**, **Socket.IO**, **yt-dlp**, and **FFmpeg**.

The application allows users to analyze media from multiple platforms, preview metadata, choose the preferred download format and quality, and download content directly from the browser.

---

## Features

### Supported Platforms

- YouTube
- Instagram
- TikTok

### Current

- Media URL analysis
- Video metadata extraction
- Thumbnail preview
- Video duration
- Channel / Author information
- MP3 download
- MP4 download
- Multiple quality selection
- Download progress (Socket.IO)
- Download queue
- Responsive interface
- Application branding
- Toast notifications
- Request validation (Zod)
- Swagger API documentation
- Centralized logging
- Dockerized backend

### Planned

- YouTube playlists
- Download history
- Download settings
- Progressive Web App (PWA)
- Desktop application
- Unit tests
- Integration tests

---

# Project Structure

```text
media-downloader/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── download/
│   │   ├── errors/
│   │   ├── logger/
│   │   ├── middleware/
│   │   ├── platforms/
│   │   │   ├── shared/
│   │   │   ├── youtube/
│   │   │   ├── instagram/
│   │   │   └── tiktok/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validation/
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── compose.yaml
└── README.md
```

---

# Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express
- TypeScript
- Socket.IO

## Media Processing

- yt-dlp
- FFmpeg

## Validation

- Zod

## Documentation

- Swagger

## DevOps

- Docker
- Rancher Desktop

---

# Requirements

- Node.js 22+
- Docker / Rancher Desktop
- Git

---

# Installation

Clone the repository

```bash
git clone https://github.com/FilippSt19/media-downloader.git

cd media-downloader
```

---

# Frontend

```bash
cd frontend

npm install

npm run dev
```

Application

```text
http://localhost:3000
```

---

# Backend

```bash
cd backend

npm install

npm run dev
```

API

```text
http://localhost:4000
```

Swagger

```text
http://localhost:4000/docs
```

---

# Docker

Build containers

```bash
docker compose build
```

Start services

```bash
docker compose up
```

Run in background

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

---

# API

## Health

```http
GET /health
```

Response

```json
{
  "status": "ok",
  "service": "media-downloader-api"
}
```

---

## Analyze Media

```http
POST /api/media/analyze
```

Request

```json
{
  "url": "https://youtu.be/example"
}
```

Response

```json
{
  "success": true,
  "platform": "youtube",
  "media": {
    "title": "Video title",
    "thumbnail": "...",
    "duration": 123,
    "uploader": "Channel",
    "formats": {
      "video": [],
      "audio": []
    }
  }
}
```

---

## Download Media

```http
POST /api/media/download
```

Video

```json
{
  "url": "https://youtu.be/example",
  "type": "video",
  "quality": 1080
}
```

Audio

```json
{
  "url": "https://youtu.be/example",
  "type": "audio",
  "quality": 192
}
```

---

# Architecture

```
Next.js
      │
      ▼
 REST API
      │
      ▼
Express
      │
      ├──────────────► Socket.IO
      │                     │
      ▼                     ▼
 Platform Services     Download Progress
      │
      ▼
yt-dlp
      │
      ▼
FFmpeg
```

---

# Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run lint
```

## Backend

```bash
npm run dev
npm run build
```

---

# Roadmap

## Version 1.1

- YouTube playlists
- Download history
- Download settings
- Mobile improvements

## Version 1.2

- Progressive Web App
- Desktop application
- Batch downloads
- Retry downloads

## Version 2.0

- User accounts
- Cloud synchronization
- Production deployment

---

# License

This project is intended for educational and portfolio purposes.

Users are responsible for ensuring they have the right to download any media and for complying with the terms of service of the supported platforms and applicable copyright laws.