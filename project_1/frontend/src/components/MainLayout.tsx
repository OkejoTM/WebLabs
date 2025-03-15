"use client"

import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Выходим из аккаунта
  };

  return (
    <div className="container">
      <nav className="header-nav">
        <ul>
          <li><Link href={"/"}>Главная</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link href={"/login"}>Вход</Link></li>
              <li><Link href={"/register"}>Регистрация</Link></li>
            </>
          ) : (
            <li>
              <Link onClick={handleLogout} href= {"/"} className="logout-btn">
                Выход
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="content">
        {children}
      </div>
      <ThemeToggle />
    </div>
  );
}
