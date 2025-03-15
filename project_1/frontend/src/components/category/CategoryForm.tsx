import React, { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Category } from "../../data/categoryType";
import { useRouter } from "next/navigation";
import { ApiService } from "@/data/apiService";

interface CategoryFormProps {
  category?: Partial<Category>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category = { name: "Новая категория" },
}) => {
  const router = useRouter();  

  const [formData, setFormData] = useState({
    id: category.id,
    name: category.name || "",
    games: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Здесь мы обновляем значение только того поля, которое изменилось
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await ApiService.updateCategory(formData.id, formData);
      } else {
        await ApiService.createCategory(formData);
      }

      router.push("/"); // Переход обратно к списку
    } catch (error) {
      console.error("Ошибка при сохранении категории", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-game-edit">
      <label className="form-label edit-form-label">
        <span className="edit-form-label-text">Название</span>
        <input
          type="text"
          className="input"
          name="name" // Обновляем name на "name", чтобы это соответствовало ключу в formData
          value={formData.name}
          onChange={handleInputChange}
          required
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

export default CategoryForm;
