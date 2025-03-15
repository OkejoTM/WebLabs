import { sanitize } from "./helpers.js";
import { getGamesList, saveGames, getGameById, isGameBought, hasMatchingGenres, isGenreEmptyAndIncluded } from "./data.js";
import { appendGameCard as appendGameCard, removeModal, removeAllGameCards as removeAllGameCards } from "./renders.js";
import { updateContent } from "./index.js";
import { handleRemoveGame } from "./events.js";

let removeConfirm = false;

/**
 * Функция получающая значения элементов формы
 * @param {Event} event 
 * @returns {{[key: string]: string}}
 */
function handleForm(event, clearInputs = true) {
    event.preventDefault(); // Отмена действия по умолчанию для события
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) throw new Error("Form must be a HTMLFormElement");

    const values = {};
    const inputs = form.querySelectorAll("input[name], textarea[name], select[name]");

    inputs.forEach(input => {
        if (input.type === "checkbox") {
            values[input.name] = input.checked; // Записать значение чекбокса
        } else {
            values[input.name] = sanitize(input.value); // Очистить и записать значение
        }
        if (clearInputs) input.value = ""; // Очистить поле после обработки
    });

    return { values };
}

/**
 * Функция для добавления новой игры через форму
 * @param {Event} event
 */
export function handleAddGameForm(event) {
    const { values: { title, description, genres, price } } = handleForm(event);
    if (title) {
        const games = getGamesList();
        const formattedGenres = genres.split(';').map(genre => {
            let res = genre.trim().toLowerCase();
            return res.charAt(0).toUpperCase() + res.slice(1); // Форматируем жанры
        });

        const newGame = {
            id: games.length + 1,
            title,
            description,
            genres: formattedGenres,
            price,
            bought: false
        };

        games.push(newGame); // Добавляем новую игру
        saveGames(); // Сохраняем список игр

        if (games.length === 1) {
            updateContent();
        } else {
            appendGameCard(newGame); // Добавляем карточку новой игры
        }
        removeModal();
    }
}

/**
 * Функция для закрытия модалки
 * @param {Event} event
 */
export function handleCloseAddGameModal(event) {
    removeModal();
}

/**
 * Функция для подтверждения удаления игры
 * @param {Event} event
 * @param {number} gameId - ID игры, которую нужно удалить
 */
export function handleRemoveConfirm(event, gameId) {
    event.preventDefault();
    const submitter = event.submitter;
    if (!submitter) return;

    if (submitter.value === "confirm") {
        handleRemoveGame(gameId); // Удалить игру
    }
    removeModal(); // Закрыть модальное окно
}

/**
 * Функция для редактирования игры через форму
 * @param {Event} event
 */
export function handleEditGame(event) {
    const { values: { title, description, genres, price, status } } = handleForm(event);
    const form = event.target;
    const gameId = form.dataset.gameId;
    const game = getGameById(gameId);

    if (!game) return;

    game.title = title;
    game.description = description;

    const formattedGenres = genres.split(';').map(genre => {
        let res = genre.trim().toLowerCase();
        return res.charAt(0).toUpperCase() + res.slice(1); // Форматируем жанры
    });

    game.genres = formattedGenres;
    game.price = price;
    game.bought = status === 'true'; // Обновляем статус покупки

    saveGames(); // Сохранить список игр
    window.location.hash = ''; // Вернуться на главную страницу
}

/**
 * Функция для фильтрации игр
 * @param {Event} event
 */
export function handleFilterGames(event) {
    const { values } = handleForm(event, false);
    const bought = values['bought'];
    const genres = Object.keys(values).filter(elem => elem !== 'bought' && elem !== 'minPrice' && elem !== 'maxPrice' && values[elem]);
    const minPrice = values['minPrice'] ? Number(values['minPrice']) : null;
    const maxPrice = values['maxPrice'] ? Number(values['maxPrice']) : null;

    // Получаем все игры
    let filteredGames = getGamesList(); 

    // Применяем фильтр по статусу покупки
    if (bought !== undefined) {
        filteredGames = filteredGames.filter(game => isGameBought(game, bought));
    }

    // Применяем фильтр по жанрам, если они указаны
    if (genres.length > 0) {
        filteredGames = filteredGames.filter(game => hasMatchingGenres(game, genres) || isGenreEmptyAndIncluded(game, genres));
    }

    // Применяем фильтр по цене, если указаны minPrice или maxPrice
    if (minPrice !== null || maxPrice !== null) {
        filteredGames = filteredGames.filter(game => {
            const price = Number(game.price); // Цена игры
            if (minPrice !== null && maxPrice !== null) {
                return price >= minPrice && price <= maxPrice;
            }
            if (minPrice !== null) {
                return price >= minPrice;
            }
            if (maxPrice !== null) {
                return price <= maxPrice;
            }
            return true;
        });
    }

    // Очищаем карточки игр и добавляем отфильтрованные
    removeAllGameCards(); 
    filteredGames.forEach(game => appendGameCard(game)); 
}



