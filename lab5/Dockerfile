FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx prisma generate # Генерация клиента внутри контейнера

EXPOSE 4000
CMD ["node", "server.js"]
