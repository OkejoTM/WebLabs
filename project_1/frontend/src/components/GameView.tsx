import React from 'react';
import { Game } from '../data/gameType';

interface GameViewProps {
	game: Game;
}

const GameView: React.FC<GameViewProps> = ({ game }) => {
	return (
		<div className="game-view">
			<h2>{game.title}</h2>
			<p>{game.description}</p>
			<div className="game-details">
				<div className="game-detail-item">
					<strong>Куплено:</strong> {game.bought ? "Да" : "Нет"}
				</div>
				<div className="game-detail-item">
					<strong>Цена:</strong> {game.price} ₽
				</div>
				{game.genres?.length > 0 && (
					<div className="game-detail-item">
						<strong>Жанры:</strong> {game.genres.join(", ")}
					</div>
				)}
			</div>
		</div>
	);
};

export default GameView;
