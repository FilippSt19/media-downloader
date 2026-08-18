FROM node:22-bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        python3 \
        python3-pip \
        python3-venv \
        curl \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/yt-dlp \
    && /opt/yt-dlp/bin/pip install --no-cache-dir -U yt-dlp

ENV PATH="/opt/yt-dlp/bin:${PATH}"

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]