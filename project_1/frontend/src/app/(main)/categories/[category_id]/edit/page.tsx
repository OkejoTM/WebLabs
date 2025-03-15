"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import CategoryForm from "../../../../../components/category/CategoryForm";
import { Category } from "../../../../../data/categoryType";
import { ApiService } from "@/data/apiService";
import withAuth from "@/components/other/withAuth";

function EditCategoryPage() {
  const params: { category_id: string } = useParams();
  const router = useRouter();
  const categoryId = Number(params.category_id);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [notAuth, setNotAuth] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (isNaN(categoryId)) {
        setLoading(false);
        return;
      }

      try {
        const fetchedCategory = await ApiService.getCategoryById(categoryId);
        if (fetchedCategory) {
          setCategory(fetchedCategory);
        } else {
          setCategory(null);
        }
      } catch (error: any) {
        console.log("Ошибка загрузки категории:", error);

        if (error.status === 401) {
          setNotAuth(true); // Неавторизован
        } else {
          setCategory(null); // Любая другая ошибка
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, router]);

  if (notAuth) {
    return <p>Неавторизован. Пожалуйста, войдите в систему.</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!category) {
    return notFound();
  }

  return (
    <>
      <h1 className="page-title">Редактирование категории</h1>
      <CategoryForm category={category || undefined} />
    </>
  );
}

export default withAuth(EditCategoryPage);
