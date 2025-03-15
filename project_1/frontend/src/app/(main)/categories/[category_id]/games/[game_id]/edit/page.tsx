"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import GameForm from "../../../../../../../components/GameForm";
import { Game } from "../../../../../../../data/gameType";
import { ApiService } from "@/data/apiService";
import withAuth from "@/components/other/withAuth";

function EditGamePage() {
  const params = useParams();
  const categoryId = Number(params.category_id);
  const gameId = Number(params.game_id);

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [notAuth, setNotAuth] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      if (!isNaN(gameId)) {
        try {
          const fetchedGame = await ApiService.getGameById(gameId);
          if (fetchedGame && fetchedGame.categoryId === categoryId) {
            setGame(fetchedGame);
          } else {
            setGame(null);
          }
        } catch (error: any) {
          console.log("Ошибка загрузки игры:", error);

          // Проверяем, если ошибка из-за отсутствия токена (401)
          if (error.status === 401) {
            setNotAuth(true); // Неавторизован
          } else {
            setGame(null); // Любая другая ошибка
          }
        }
      }
      setLoading(false);
    };

    fetchGame();
  }, [categoryId, gameId]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (notAuth) {
    return <p>Неавторизован. Пожалуйста, войдите в систему.</p>; // Сообщение для неавторизованных пользователей
  }

  if (!game) {
    return notFound(); // Выводим 404, если игра не найдена
  }

  return (
    <>
      <h1 className="page-title">Редактирование игры</h1>
      <GameForm game={game} categoryId={categoryId} />
    </>
  );
}

export default withAuth(EditGamePage);
