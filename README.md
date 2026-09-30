# 🎬 Media Studio

A modern full-stack media platform built with **Next.js**, **Express**, **TypeScript**, **Docker**, **Socket.IO**, **yt-dlp**, **FFmpeg**, and deployed on **Microsoft Azure**.

Media Studio provides a modern interface for downloading, converting and processing media from multiple platforms while offering a scalable architecture for future AI-powered features.

---

# ✨ Features

## 📥 Download

Supported platforms

- YouTube
- Instagram
  - Posts
  - Reels
  - Stories
- TikTok

Current features

- URL analysis
- Metadata extraction
- Thumbnail preview
- Video duration
- Channel / Author information
- Multiple video qualities
- MP3 downloads
- MP4 downloads
- Real-time download progress
- Socket.IO progress updates
- Download queue
- Request validation
- Swagger documentation

---

## 🔄 Converter

Currently in development.

Planned modules

### 🎬 Video

- MP4 → MP3
- MP4 → GIF
- MOV → MP4
- WEBM → MP4
- MKV → MP4

### 🎵 Audio

- MP3 ↔ WAV
- AAC ↔ MP3
- FLAC ↔ MP3
- M4A ↔ MP3

### 🖼 Images

- PNG ↔ JPG
- PNG ↔ WEBP
- WEBP ↔ JPG
- HEIC ↔ JPG
- SVG ↔ PNG

### 📄 Documents

- PDF ↔ DOCX
- DOCX ↔ PDF
- PPTX → PDF
- XLSX → PDF
- TXT → PDF

---

## 🤖 AI (Planned)

- Automatic subtitles
- Subtitle translation
- AI summaries
- Speaker detection
- Voice enhancement

---

## 🎥 Video Tools (Planned)

- Trim
- Merge
- Crop
- Resize
- Compress
- Change playback speed

---

## 🖼 Image Tools (Planned)

- Remove background
- OCR
- Image compression
- Resize
- Format optimization

---

## 🔊 Audio Tools (Planned)

- Noise reduction
- Volume normalization
- Voice enhancement

---

# 📱 Progressive Web App

Media Studio can be installed as a native application on desktop and mobile devices.

Features

- Installable on Android
- Installable on Windows
- Standalone mode
- Responsive design
- Mobile-first interface

---

# ☁ Cloud

Hosted on Microsoft Azure.

Services

- Azure Container Apps
- Azure Container Registry

---

# 🏗 Project Structure

```text
media-studio/

├── frontend/
│
│   ├── app/
│   │   ├── download/
│   │   ├── convert/
│   │   ├── ai/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── download/
│   │   ├── converter/
│   │   └── shared/
│   │
│   ├── hooks/
│   ├── config/
│   ├── public/
│   └── ...
│
├── backend/
│
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── download/
│   ├── converter/
│   ├── middleware/
│   ├── platforms/
│   │
│   │   ├── youtube/
│   │   ├── instagram/
│   │   ├── tiktok/
│   │   └── shared/
│   │
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   ├── validation/
│   └── server.ts
│
├── compose.yaml
├── deploy.ps1
└── README.md
```

---

# 🛠 Tech Stack

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
- Microsoft Azure

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/FilippSt19/media-downloader.git

cd media-downloader
```

Install dependencies

```bash
npm install
```

---

# 💻 Local Development

Run the complete application

```bash
docker compose up -d --build
```

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:4000
```

Swagger

```
http://localhost:4000/docs
```

Stop containers

```bash
docker compose down
```

---

# 📡 API

## Health

```http
GET /health
```

Response

```json
{
  "status": "ok",
  "service": "media-studio-api"
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

---

## Download Media

```http
POST /api/media/download
```

Video

```json
{
  "url": "...",
  "type": "video",
  "quality": 1080
}
```

Audio

```json
{
  "url": "...",
  "type": "audio",
  "quality": 192
}
```

---

# 🏛 Architecture

```text
                    Media Studio

                          │

      ┌───────────────────┼───────────────────┐
      │                   │                   │

  Download            Converter             AI

      │                   │                   │

      └───────────────────┼───────────────────┘
                          │

                    Express API

                          │

                Platform Services

                          │

                yt-dlp / FFmpeg

                          │

                Azure Container Apps
```

---

# 🗺 Roadmap

## Version 1.0

- Download dashboard
- YouTube
- Instagram
- TikTok
- PWA
- Azure deployment

## Version 2.0

- Video Converter
- Audio Converter
- Image Converter
- Document Converter

## Version 2.1

- AI features
- Automatic subtitles
- Translation
- Video summary

## Version 2.2

- Video Tools
- Image Tools
- Audio Tools

---

# 📄 License

This project is intended for educational and portfolio purposes.

Users are responsible for ensuring they have the right to download or process media and documents and for complying with copyright laws and the terms of service of supported platforms.