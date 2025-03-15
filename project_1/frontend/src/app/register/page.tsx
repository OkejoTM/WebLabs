"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/data/apiService";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await ApiService.register(username, password);
      router.push("/login"); // Редирект на страницу входа после успешной регистрации
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Регистрация</h1>
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
