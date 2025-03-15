import React from 'react';
import Modal from '../Modal';
import { Category } from '../../data/categoryType';

interface RemoveCategoryConfirmationProps {
	isOpen: boolean;
	category: Category;
	onClose: () => void;
	onConfirm: () => void;
}

const RemoveCategoryConfirmation: React.FC<RemoveCategoryConfirmationProps> =
	({ category, isOpen, onClose, onConfirm }) => {
		const handleConfirm = (e: React.FormEvent) => {
			e.preventDefault();
			onConfirm();
		};

		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="remove-confirm">
					<h3>Вы действительно хотите удалить следующую категорию: "{category.name}"?</h3>
					<form className="form-remove-confirm" onSubmit={handleConfirm}>
						<button type="submit" className="btn btn-danger">Да</button>
						<button type="submit" className="btn btn-green" onClick={onClose}>Нет</button>
					</form>
				</div>
			</Modal>
		);
	};

export default RemoveCategoryConfirmation;