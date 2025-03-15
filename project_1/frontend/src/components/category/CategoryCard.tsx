import React, { useState } from 'react';
import Link from 'next/link';

import { Category } from '../../data/categoryType';
import { Edit, Trash2 } from 'lucide-react';
import RemoveCategoryConfirmation from './../modals/RemoveCategoryConfirme';

interface CategoryCardProps {
    category: Category;
    onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

    const openDeleteModal = () => setRemoveModalOpen(true);

    return (
        <>
            <RemoveCategoryConfirmation
                category={category}
                isOpen={isRemoveModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                onConfirm={() => onDelete(category.id)}
            />

            <div className="list__item card game" data-id={category.id}>               
                <Link className="link-category-games" href={`/categories/${category.id}/games`} passHref>
                    <div className="card-body">
                        <div className="card-header game-header">
                            <h5 className="card-title">{category.name}</h5>
                        </div>
                        <div className="card-content">
                            <h2>Нажмите чтобы посмотреть</h2>
                        </div>
                    </div>
                </Link>
            

            <div className="card-icons">
                <Link href={`/categories/${category.id}/edit`} className="btn-icon btn-icon-edit">
                    <Edit />
                </Link>
                <button className="btn-icon btn-icon-danger" onClick={openDeleteModal}>
                    <Trash2 />
                </button>
            </div>
        </div>
        </>
    );
};

export default CategoryCard;
