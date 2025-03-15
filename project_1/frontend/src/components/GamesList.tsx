import { useEffect, useState } from "react";
import { Game } from "../data/gameType";
import GameCard from "./GameCard";
import FiltersForm from './FilterForm';
import { ApiService } from "@/data/apiService";

interface GamesListProps {
  categoryId: number; // Добавляем пропс для ID категории
}

const GamesList: React.FC<GamesListProps> = ({ categoryId }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);


  const [filter, setFilter] = useState<{
    bought: string;
    genres: string[];
    priceRange: { min: number; max: number };
  }>({
    bought: "all",
    genres: [],
    priceRange: { min: 0, max: Infinity },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем игры из API при монтировании или изменении categoryId
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getGamesByCategoryId(categoryId); // Используем новый метод
        setGames(data);
        setFilteredGames(data);
      } catch (err) {
        setError("Не удалось загрузить игры.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchGames();
    }
  }, [categoryId]); // Перезапуск загрузки игр при изменении categoryId

  // Удаление игры
  const onDeleteGame = async (gameID: number) => {
    try {
      await ApiService.deleteGame(gameID);
      // Обновляем игры сразу в состоянии, исключая удаленную игру
      const updatedGames = games.filter(game => game.id !== gameID);
      setGames(updatedGames);      
      setFilteredGames(updatedGames);  // Обновляем фильтрованные игры          
    } catch (err) {
      setError("Не удалось удалить игру.");
      console.error(err);
    }
  };

  // Фильтрация игр
  const onFilterChange = (genres: string[], bought: string, priceRange: { min: number; max: number }) => {
    setFilter({ bought, genres, priceRange });

    const filtered = games.filter(game => {
      const matchesGenres = genres.length === 0 || genres.some(genre => game.genres.includes(genre));
      const matchesBought = bought === "all" || game.bought.toString() === bought;
      const matchesPrice = game.price >= priceRange.min && game.price <= priceRange.max;
      return matchesGenres && matchesBought && matchesPrice;
    });

    setFilteredGames(filtered);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="games-list">
      <FiltersForm onApply={onFilterChange} categoryId={categoryId} /> {/* Форма фильтрации */}
      <div className="games-block">
        <div className="games__list card-list">
          {filteredGames?.length === 0 ? (
            <h5 className="no-games">Нет игр для отображения</h5>
          ) : (
            filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game} // Передаем объект игры в карточку
                onDelete={onDeleteGame}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesList;
