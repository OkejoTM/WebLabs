import React from 'react';
import Modal from '../Modal';
import { Game } from '../../data/gameType';

interface RemoveGameConfirmationProps {
	isOpen: boolean;
	game: Game;
	onClose: () => void;
	onConfirm: () => void;
}

const RemoveGameConfirmation: React.FC<RemoveGameConfirmationProps> =
	({ game, isOpen, onClose, onConfirm }) => {
		const handleConfirm = (e: React.FormEvent) => {
			e.preventDefault();
			onConfirm();
		};

		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="remove-confirm">
					<h3>Вы действительно хотите удалить следующую игру: "{game.title}"?</h3>
					<form className="form-remove-confirm" onSubmit={handleConfirm}>
						<button type="submit" className="btn btn-danger">Да</button>
						<button type="submit" className="btn btn-green" onClick={onClose}>Нет</button>
					</form>
				</div>
			</Modal>
		);
	};

export default RemoveGameConfirmation;