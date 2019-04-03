FROM node:11

ARG API_URL
ARG HOST
ARG PORT
ENV HOST="$HOST"
ENV PORT="$PORT"
ENV API_URL="$API_URL"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}
CMD [ "npm", "start"]
