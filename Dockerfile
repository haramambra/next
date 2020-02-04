FROM node:12.11-alpine AS release
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY public/ ./static
COPY .next/ ./.next

RUN npm install --only=production

CMD ["node", "run", "prod"]
