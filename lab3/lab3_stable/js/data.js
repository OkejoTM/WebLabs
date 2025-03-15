// @ts-check
/// <reference path="./types.d.ts"/>

/** @type {Game[] | null} */
let gamesStorage = null;

/**
 * Функция, которая возвращает стандартный список игр.
 * @returns {Game[]}
 */
function getDefaultGamesList() {
    return [
        {
            id: 0,
            title: 'GTA 5',
            description: 'Действие игры происходит в вымышленном штате Сан-Андреас...',
            genres: ["Открытый мир", "Шутер от первого лица", "Экшен"],
            price: 1000,
            bought: true
        },
        {
            id: 1,
            title: 'Elden ring',
            description: 'Компьютерная игра сурово наказывает за ошибки...',
            genres: ["Фэнтези", "Ролевая", "Файтинги"],
            price: 3999,
            bought: false
        }
    ];
}

/**
 * Получает игры из локального хранилища или возвращает стандартный список.
 * @returns {Game[]}
 */
function loadGamesFromLocalStorage() {
    const gamesInLocalStorage = localStorage.getItem('games'); // игры в локальном хранилище
    if (gamesInLocalStorage) { // Если игры находятся в локальном хранилище
        try {
            return JSON.parse(gamesInLocalStorage); // Считать данные с локального хранилища
        } catch (e) {
            localStorage.removeItem('games'); // Очистить список в локальном хранилище
        }
    }
    return getDefaultGamesList(); // Занести список игров по умолчанию
}

/**
 * Функция, которая возвращает список игр
 * @returns {Game[]}
 */
export function getGamesList() {
    if (gamesStorage) return gamesStorage; // Если хранилище игр не пустое
    gamesStorage = loadGamesFromLocalStorage(); // Получить игры из локального хранилища
    localStorage.setItem('games', JSON.stringify(gamesStorage)); // Загружаем стандартный список игр в локальное хранилище
    return gamesStorage === null ? [] : gamesStorage; // Вернуть список игр
}

/**
 * Возвращает игру по ее id
 * @param {number} id 
 * @returns {Game | undefined}
 */
export function getGameById(id) {
    gamesStorage = getGamesList();
    return gamesStorage?.find(game => game.id === Number(id));
}

/**
 * Функция, которая выполняет сохранение игр в локальное хранилище
 */
export function saveGames() {
    const games = getGamesList(); // Получить игры
    localStorage.setItem('games', JSON.stringify(games)); // Записать в хранилище
}

/**
 * Функция, которая формирует множество жанров
 * @returns {string[]}
 */
export function getAllGenres() {
    const games = getGamesList();
    const res = new Set(games.flatMap(game => game.genres)); // Формирование множества жанров
    return Array.from(res).sort(); // Сортировка в алфавитном порядке
}

/**
 * Проверяет, куплена ли игра, в зависимости от параметра bought
 * @param {Game} game
 * @param {string} bought
 * @returns {boolean}
 */
export function isGameBought(game, bought) {
    return bought === 'true' ? game.bought : !game.bought;
}

/**
 * Проверяет наличие совпадающих жанров
 * @param {Game} game
 * @param {string[]} genres
 * @returns {boolean}
 */
export function hasMatchingGenres(game, genres) {
    return game.genres.some(genre => genres.includes(genre)) || genres.length === 0;
}

/**
 * Проверяет, является ли жанр пустым и включен ли 'Без жанра'
 * @param {Game} game
 * @param {string[]} genres
 * @returns {boolean}
 */
export function isGenreEmptyAndIncluded(game, genres) {
    return game.genres[0] === "" && genres.includes('Без жанра');
}

/**
 * Фильтрует игры по статусу покупки и жанрам
 * @param {string} bought
 * @param {string[]} genres
 * @returns {Game[]}
 */
export function getFilteredGamesList(bought, genres) {
    const games = getGamesList(); // Получить список игр
    let res = new Set();

    games.forEach((game) => {
        if (isGameBought(game, bought) && (hasMatchingGenres(game, genres) || isGenreEmptyAndIncluded(game, genres))) {
            res.add(game);
        }
    });

    return Array.from(res);
}
