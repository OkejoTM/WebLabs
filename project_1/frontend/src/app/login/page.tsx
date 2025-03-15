"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Импортируйте контекст
import { ApiService } from "@/data/apiService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // Получаем метод login из контекста
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Логинимся через ApiService и получаем токен
      const responce = await ApiService.login(username, password);
      
      // Устанавливаем токен в глобальное состояние через контекст
      login(responce.token);

      // Редирект на главную страницу
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Вход</h1>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="username" className="auth-label">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password" className="auth-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
