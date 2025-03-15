"use client";

import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList';
import { Category } from '../../data/categoryType';
import { ApiService } from '@/data/apiService';

const CategoriesPage = () => {
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
        setError('Не удалось загрузить категории');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1 className="card-title">Доступные категории</h1>
      <CategoryList/>
    </>
  );
};

export default CategoriesPage;
