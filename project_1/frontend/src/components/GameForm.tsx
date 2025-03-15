import React, { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Game } from "../data/gameType";
import { useRouter } from "next/navigation";
import { ApiService } from "@/data/apiService";

interface GameFormProps {
  game?: Partial<Game>;
  categoryId: number;
}

const GameForm: React.FC<GameFormProps> = ({
  game = { title: "Новая игра", description: "", bought: false, price: 0 }, categoryId
}) => {
  const router = useRouter();  

  const [formData, setFormData] = useState({
    id: game.id,
    title: game.title || "",
    description: game.description || "",
    price: game?.price || 0,
    bought: game?.bought || false,
    genres: game?.genres || [], 
  });
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      bought: checked,
    }));
  };

  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const genresArray = value.split(";");

    setFormData((prev) => ({
      ...prev,
      genres: genresArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (formData.id) {
        // Обновление существующей игры
        await ApiService.updateGame(formData.id, formData);
      } else {
        // Создание новой игры с привязкой к категории
        const newGame = { ...formData, categoryId };
        await ApiService.createGame(newGame);
      }
        
      router.push(`/categories/${categoryId}/games`);
    } catch (error) {
      console.error("Ошибка при сохранении игры", error);
    }
  };
  

  const uniqueGenres = Array.from(new Set(formData.genres));

  return (
    <form onSubmit={handleSubmit} className="form-game-edit">
      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Название</span>
        <input
          type="text"
          className="input"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Описание</span>
        <textarea
          name="description"
          className="textarea"
          value={formData.description}
          onChange={handleInputChange}
          rows={5}
        />
      </label>

      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Цена</span>
        <input
          type="number"
          className="input"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          min={0}
          required
        />
      </label>

      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Куплено</span>
        <input
          className="input"
          type="checkbox"
          checked={formData.bought}
          onChange={handleCheckboxChange}
        />
      </label>

      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Жанры</span>
        <input
          type="text"
          className="input"
          name="genres"
          value={formData.genres.join(";")}
          onChange={handleGenresChange}
          placeholder="Жанры через ;"
        />
      </label>

      <div className="edit-form-buttons">
        <button className="btn btn-primary" type="button" onClick={() => router.back()}>
          Отмена
        </button>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default GameForm;
