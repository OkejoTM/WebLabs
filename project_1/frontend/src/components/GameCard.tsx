import React, { useState } from 'react';
import Link from 'next/link';

import { Game } from '../data/gameType'; 
import { Edit, Trash2 } from 'lucide-react';
import RemoveGameConfirmation from './modals/RemoveGameConfirme'; 
import ViewGame from './modals/ViewModal';

interface GameCardProps {
  game: Game;
  onDelete: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onDelete }) => {
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const openDeleteModal = () => setRemoveModalOpen(true);
  const openViewModal = () => setViewModalOpen(true);

  return (
    <>
      <RemoveGameConfirmation
        game={game}
        isOpen={isRemoveModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onConfirm={() => onDelete(game.id)}
      />
      <ViewGame
        game={game}
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <div className="list__item card game" data-id={game.id}>
        <div className="card-body" onClick={openViewModal}>
          <div className="card-header game-header">
            <h5 className="card-title">{game.title}</h5>
          </div>
          <div className="card-content">
            <div className="game-description">{game.description}</div>
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
        </div>
        <div className="card-icons">
        <Link href={`/categories/${game.categoryId}/games/${game.id}/edit`} className="btn-icon btn-icon-edit">
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


export default GameCard;
