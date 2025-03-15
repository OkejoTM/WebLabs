import React from 'react';
import Modal from '../Modal';
import { Game } from '../../data/gameType';
import GameView from '../GameView';

interface ViewGameProps {
    isOpen: boolean;
    game: Game;
    onClose: () => void;
    onConfirm?: () => void;
}

const ViewGame: React.FC<ViewGameProps> =
    ({ game, isOpen, onClose, onConfirm }) => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <GameView game={game} />
            </Modal>
        );
    };

export default ViewGame;