// @ts-check
/// <reference path="./types.d.ts"/>

import { saveGames, getGameById, getGamesList } from './data.js';
import {  handleRemoveConfirm } from './form.js';
import { partial, toJson } from './helpers.js';
import { updateContent } from './index.js';
import {removeGameCard, renderModal, renderRemoveConfirm, rerenderGameCard} from './renders.js';

/**
 * Функция обработки события смена статуса фильма
 * @param {number} gameId 
 */
function handleToggleFilmStatus(gameId)
{
    const game = getGameById(gameId); // Получить фильм по id
    if (!game) return; // Если фильм не найден
    game.bought = !game.bought // Переключить статус фильма
    saveGames(); // Сохранить список фильмов в локальное хранилище
    rerenderGameCard(game); // Перерисовать содержимое
}

/**
 * Функция обработки dropdown
 */
export function handleDropdown(event) {
    const dropdown = event.target.closest('.dropdown');
    // Закрыть другие dropdown
    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
        if (otherDropdown !== dropdown)
            otherDropdown.classList.remove('dropdown-open');
    });
    // Открыть соответствующий dropdown
    if (dropdown && event.target.closest('#dropdown-description-button'))
        dropdown.classList.toggle('dropdown-open');
    else if (dropdown && event.target.closest('#dropdown-genres-button'))
        dropdown.classList.toggle('dropdown-open');
    else if (!dropdown || (!event.target.closest('textarea') && !event.target.closest('input'))) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('dropdown-open');
        });
    }
} 

function handleShowRemoveGameConfirmation(gameId) {
    const game = getGameById(gameId); // Найти по Id
    if (!game) return; // не найден
    const res = renderModal(renderRemoveConfirm(game));
    const modal = res.querySelector('.modal');
    if (!modal) return;
    modal.classList.add('modal-open');
    document.body.append(modal);
}

/**
 * Функция обработки события удаления фильма
 * @param {Number} gameId 
 * @returns 
 */
export function handleRemoveGame(gameId) {
    const game = getGameById(gameId); // Найти по Id
    const gameList = getGamesList(); // Список 
    if (!game) return; // не найден
    const index = gameList.indexOf(game) // Найти индекс  в списке
    gameList.splice(index, 1); // Удалить из списка
    saveGames(); // Сохранения списка  
    if (gameList.length === 0)
        updateContent(); // Обновить содержимое страницы
    else
        removeGameCard(gameId); // Удалить карточку
}

function initDispatchEvents() {
    /**
   * @param {string} eventName 
   * @param {Record<string, any>} [detail] 
   */
    function dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {detail});
        document.dispatchEvent(event);
    }
    window.dispatch = dispatchEvent;
}

/**
 * Добавление события
 */
function addEvent(eventName, callback) {
    document.addEventListener(eventName, (event) => {
        callback(event.detail);
    });
}

export function initEvents() {
    initDispatchEvents();
    addEvent(events.toggleGameStatus, handleToggleFilmStatus);
    addEvent(events.removeGame, handleShowRemoveGameConfirmation);
    
}

const events = {
    toggleGameStatus : "toggle-game-status",
    removeGame : "remove-game",
    addGameEvent : "add-game",
    closeModal: "close-modal"
};

/**
 * @param {string} eventName
 * @param {any} details
 */
function baseDispatch(eventName, details) {
    return `window.dispatch?.call(null, '${eventName}', ${toJson(details)})`
}

export const dispatchToggleGameStatus = partial(baseDispatch, events.toggleGameStatus);

export const dispatchRemoveGame = partial(baseDispatch, events.removeGame);

