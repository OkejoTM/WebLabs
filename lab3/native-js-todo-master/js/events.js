// @ts-check
/// <reference path="./types.d.ts"/>

import { saveGames, getGameById, getGamesList, removeAllGamesFromStorage } from './data.js';
import {  handleRemoveConfirm } from './form.js';
import { partial, toJson } from './helpers.js';
import { updateContent } from './index.js';
import {removeGameCard, renderModal, renderRemoveConfirm, rerenderGameCard, removeAllGameCards} from './renders.js';

/**
 * Функция обработки события смена статуса фильма
 * @param {number} gameId 
 */
function handleToggleGameStatus(gameId)
{
    console.log("Handle toggle game", gameId);
    const game = getGameById(gameId); // Получить фильм по id
    if (!game) return; // Если фильм не найден
    game.bought = !game.bought // Переключить статус фильма
    saveGames(); // Сохранить список фильмов в локальное хранилище
    rerenderGameCard(game); // Перерисовать содержимое
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

export function handleRemoveAllGames() {
    removeAllGamesFromStorage(); // Remove from local storage    
    saveGames(); // Ensure that storage is cleared properly
    removeAllGameCards(); // Remove all game cards from the UI
    updateContent(); // Re-render the page to reflect no games    
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
    addEvent(events.toggleGameStatus, handleToggleGameStatus);
    addEvent(events.removeGame, handleShowRemoveGameConfirmation);
    addEvent(events.removeAllGames, handleRemoveAllGames);
}

const events = {
    toggleGameStatus : "toggle-game-status",
    removeGame : "remove-game",
    removeAllGames: "remove-all-games"
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

export const dispatchRemoveAllGames = partial(baseDispatch, events.removeAllGames);
