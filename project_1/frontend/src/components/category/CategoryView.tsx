import React from 'react';
import { Category } from '../../data/categoryType';

interface CategoryViewProps {
	category: Category;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
	return (
		<div className="game-view">
			<h2>{category.name}</h2>
			<h2>Нажмите чтобы увидеть игры {category.name}и</h2>
		</div>
	);
};

export default CategoryView;
