import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiService } from "@/data/apiService";

interface FiltersFormProps {
  onApply: (genres: string[], bought: string, priceRange: { min: number; max: number }, categoryId: number) => void;
  categoryId: number; // Добавляем пропс для categoryId
}

function getCheckboxTemplate(element: string) {
  return (
    <label className="checkbox-label">
      <input className="checkbox-input" type="checkbox" name={element ? element : 'Без Жанра'} />
      {element ? element : 'Без Жанра'}
    </label>
  );
}

const FiltersForm: React.FC<FiltersFormProps> = ({ onApply, categoryId }: FiltersFormProps) => {
  const [bought, setBought] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [genresList, setGenresList] = useState<string[]>([]);


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Получаем игры по категории
        const games = await ApiService.getGamesByCategoryId(categoryId);
        const genres = Array.from(new Set(games.flatMap(game => game.genres)));
        setGenresList(genres);
      } catch (error) {
        console.error("Ошибка загрузки жанров:", error);
      }
    };

    if (categoryId) {
      fetchGenres();
    }
  }, [categoryId]); // Перезагружаем жанры при изменении категории

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    const selectedGenres: string[] = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedGenres.push(checkbox.name);
      }
    });

    onApply(selectedGenres, bought, { min: minPrice, max: maxPrice }, categoryId); // Передаем categoryId
  };

  const handleReset = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    setBought("all");
    setMinPrice(0);
    setMaxPrice(Infinity);
    onApply([], "all", { min: 0, max: Infinity }, categoryId); // Сбрасываем фильтры
  };

  return (
    <div className="filters-block">
      <form className="filters-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label className="filters-label">Фильтр по покупке</label>
          <select
            value={bought}
            onChange={(e) => setBought(e.target.value)}
            className="filters-bought"
          >
            <option value="all">Все</option>
            <option value="true">Купленные</option>
            <option value="false">Не купленные</option>
          </select>
        </div>

        <label className="filters-label">Доступные жанры</label>
        <div className="genres-list">
          {genresList.length > 0 ? (
            genresList.map((genre, index) => (
              <div key={index} className="genre-item">
                {getCheckboxTemplate(genre)}
              </div>
            ))
          ) : (
            <p>Загрузка жанров...</p>
          )}
        </div>

        <label className="filters-label">Цена</label>
        <div className="price-filter">
          <input
            type="number"
            className="filter-price"
            placeholder="Мин"
            min="0"
            value={minPrice === 0 ? "" : minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
          />
          <input
            type="number"
            className="filter-price"
            placeholder="Макс"
            min="0"
            value={maxPrice === Infinity ? "" : maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
          />
        </div>

        <button type="submit" className="btn btn-primary" id="apply-filters-button">
          Применить
        </button>
        <button type="button" className="btn btn-primary" id="reset-filters-button" onClick={handleReset}>
          Сбросить
        </button>
        <Link href={`/categories/${categoryId}/games/new`} className="btn btn-green">
          Создать игру
        </Link>
        <Link href={`/`} className="btn btn-primary btn-back">
          Вернуться
        </Link>
      </form>
    </div>
  );
};

export default FiltersForm;
