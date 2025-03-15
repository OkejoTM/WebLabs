"use client";

import React, { useEffect, useState } from 'react';
import GamesList from './GamesList';
import { Game } from '../data/gameType';
import { ApiService } from '@/data/apiService';
import { useParams } from 'next/navigation';

const GamesPage = () => {
  const params = useParams();
  const categoryId = params.category_id ? Number(params.category_id) : null; // Преобразуем параметр в число

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем категории или категорию, если нужно
  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        setLoading(true);        
      } catch (err) {
        setError('Не удалось загрузить категорию');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryId();
  }, []); // Загружаем только один раз при монтировании компонента

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1 className="card-title">Игры по категории</h1>
      {categoryId !== null ? (
        <GamesList categoryId={categoryId} /> // Передаем categoryId в GamesList
      ) : (
        <p>Выберите категорию</p>
      )}
    </>
  );
};

export default GamesPage;
