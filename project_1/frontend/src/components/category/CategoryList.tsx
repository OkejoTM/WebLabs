import { useEffect, useState } from "react";
import { Category } from "../../data/categoryType";
import CategoryCard from "./CategoryCard";
import { ApiService } from "@/data/apiService";
import Link from "next/link";


const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);    

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await ApiService.getCategories();
        setCategories(categories);
      } catch (err) {
        setError('Не удалось загрузить категории игр');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  
  const onDeleteGame = async (categoryId: number) => {
    try {
      await ApiService.deleteCategory(categoryId);
      const categories = await ApiService.getCategories();        
      setCategories(categories);
    } catch (err) {
      setError("Не удалось удалить.");
      console.error(err);
    }
  };
  
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="games-list">     
      <div className="filters-block">
        <div className="filters-form">
          <div className="filter-group">      
            <Link href="/categories/new" className="btn btn-green">
              Создать категорию
            </Link>
          </div>
        </div> 
      </div> 
      <div className="games-block">
        <div className="games__list card-list">
          {categories?.length === 0 ? (
            <h5 className="no-games">Нет категорий для отображения</h5>
          ) : (
            categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category} 
                onDelete={onDeleteGame}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
