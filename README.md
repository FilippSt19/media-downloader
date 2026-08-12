# Media Downloader

![CI](https://github.com/<username>/media-downloader/actions/workflows/ci.yml/badge.svg)

A modern full-stack media downloader built with **Next.js**, **Express**, **TypeScript**, **Docker**, **yt-dlp**, and **FFmpeg**.

The application allows users to analyze supported media URLs, preview metadata, and download content in different formats (MP3 / MP4).

---

## Features

### Current

* YouTube URL analysis
* Video metadata extraction
* Thumbnail preview
* Video duration
* Channel information
* MP3 download
* MP4 download
* Multiple quality selection
* Dockerized backend
* REST API
* Responsive interface
* GitHub Actions CI

### Planned

* Instagram support
* TikTok support
* Download history
* Download queue
* Download progress
* Authentication
* API documentation (Swagger)
* Unit tests
* Integration tests

---

# Project Structure

```text
media-downloader/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── platforms/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── compose.yaml
└── README.md
```

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express
* TypeScript

## Media Processing

* yt-dlp
* FFmpeg

## DevOps

* Docker
* Rancher Desktop
* GitHub Actions

---

# Requirements

* Node.js 22+
* Docker / Rancher Desktop
* Git

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

Application:

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

API:

```text
http://localhost:4000
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

```
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

## Analyze media

```
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

## Download media

```
POST /api/media/download
```

Request

```json
{
  "url": "https://youtu.be/example",
  "type": "audio",
  "quality": 192
}
```

or

```json
{
  "url": "https://youtu.be/example",
  "type": "video",
  "quality": 720
}
```

---

# Development Workflow

1. Create a new branch
2. Implement the feature
3. Run local checks
4. Commit changes
5. Push branch
6. Open Pull Request
7. Merge into `main`

---

# Available Scripts

## Frontend

```bash
npm run dev
npm run lint
npm run build
```

## Backend

```bash
npm run dev
npm run build
```

---

# Continuous Integration

Every push and pull request triggers GitHub Actions.

Current pipeline:

* Frontend lint
* Frontend build
* Backend build

---

# Roadmap

* YouTube improvements
* Instagram integration
* TikTok integration
* Download progress
* Download history
* Download queue
* Authentication
* API documentation
* Unit testing
* Integration testing
* Production deployment

---

# License

This project is intended for educational and portfolio purposes.

Please ensure you have the right to download any media you use with the application and comply with the terms of service and applicable copyright laws.
