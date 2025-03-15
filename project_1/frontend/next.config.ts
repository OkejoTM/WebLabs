import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env

const nextConfig: NextConfig = {
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST, // Передаем переменную окружения в приложение
  },
  // Другие опции Next.js можно добавить сюда
};

export default nextConfig;
