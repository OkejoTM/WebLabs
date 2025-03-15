# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Сборка проекта
RUN npm run build

# Экспонируем порт, который будет использовать ваш фронтенд (например, 3000)
EXPOSE 3000

# Запуск фронтенд-приложения
CMD ["npm", "start"]
