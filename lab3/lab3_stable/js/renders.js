import { dispatchRemoveGame, dispatchToggleGameStatus } from "./events.js";
import { arrayToString } from "./helpers.js";
import { deleteIcon, eyeIcon, eyeOffIcon, editIcon, backIcon, crossIcon } from "./icons.js";
import { handleAddGameForm, handleRemoveConfirm, handleEditGame, handleFilterGames, handleCloseAddGameModal} from "./form.js";
import { getAllGenres } from "./data.js";
import { updateContent } from "./index.js";


function fragment(strings, ...values) {
    const str = strings.reduce( (buffer, string, i) => buffer +  string + (values[i] ?? ''), '' ); // Формирование строки для построения
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
}

/**
 * Функция для отрисовки ошибки при отсутствии запрашиваемого контента
 */ 
export function renderNotFound() {
    return fragment/*html*/`
        <h1 class="page-title">Страница не найдена</h1>
    `;
}

/**
 * Отрисовка списка фильмов
 * @param {Game[]} gamesList 
 * @returns 
 */
export function renderGamesList(gamesList) {
    const page = fragment/*html*/`
    <h1 class="page-title">Список игр для покупки</h1>
    <div class="games-list">
        <div class="filters-block">
            <form class="filters-form" method="post">
                <label class="filters-label">Статус покупки
                    <select class="filters-bought" name="bought">
                        <option value="all" selected>Все</option>
                        <option value="true">Куплен</option>
                        <option value="false">Не куплен</option>
                    </select>
                </label>
                <label class="filters-label">Жанры
                    ${(function fun() { // Вывод списка жанров
                        const genres = getAllGenres();
                        let res = "";
                        genres.forEach((genre) => {
                            res += getCheckboxTemplate(genre);
                        });
                        return res;
                    })()}
                </label>
                <label class="filters-label">Цена
                    <input type="number" class="filter-price" name="minPrice" placeholder="Мин" min="0" />
                    <input type="number" class="filter-price" name="maxPrice" placeholder="Макс" min="0" />
                </label>
                <button type="submit" class="btn btn-primary" id="apply-filters-button">Применить</button>
                <button type="button" class="btn btn-primary" id="reset-filters-button" >Сбросить</button>
                <button type="button" class="btn btn-primary" id="open-add-game-modal">Добавить игру</button>
            </form>
        </div>
        <div class="games-block">
            <div class="games__list card-list">
                ${gamesList.length === 0 
                    ? /*html*/`<h5 class="no-games">Список игр пуст.</h5>` 
                    : getGameCardTemplate(gamesList)}
            </div>            
        </div>
    </div>
    `;

    page.querySelector('#open-add-game-modal').addEventListener('click', () => {
        const modal = renderAddGameModal();
        document.body.appendChild(modal);                        
    });

    const formFilters = page.querySelector('.filters-form');
    formFilters.addEventListener('submit', handleFilterGames)
    // const form = page.querySelector('.form-games-add');
    // form.addEventListener('submit', handleAddGameForm);
    const reset = page.querySelector('#reset-filters-button');
    reset.addEventListener('click', updateContent);
    return page;
}

function getCheckboxTemplate(element) {
    return /*html*/`
    <label class="checkbox-label">
        <input class="checkbox-input" type="checkbox" name="${element ? element : 'Без жанра'}" />
        ${element ? element : 'Без жанра'}
    </label>
    `
}

/**
 * Отрисовка карточек фильмов
 * @param {Game[]} gameList
 */
function getGameCardTemplate(gamesList) {
    return gamesList.map(game => {        
        return /*html*/`
            <div class="list__item card game" data-id="${game.id}">
                <div class="card-body" onclick="${dispatchToggleGameStatus(game.id)}">
                    <div class="card-header game-header ${game.bought ? 'game-header__bought' : ''}" >
                        <h5 class="card-title">${game.title}</h5>
                    </div>
                    <div class="card-content">
                        <div class="game-description"><span class="card-point-name">Описание:</span> ${game.description} </div>
                        <div class="game-genres"><span class="card-point-name">Жанры:</span> ${arrayToString(game.genres)}</div>
                        <div class="game-genres"><span class="card-point-name">Цена:</span> ${game.price}</div>                        
                        <div class="game-status"><span class="card-point-name">Статус:</span> ${game.bought ? `<span class="boughted">Куплена</span>` : `<span class="unboughted">Не куплена</span>`}</div>
                    </div>
                </div>
                <div class="card-icons">
                    <div class="card-icon game-status-icon" onclick="${dispatchToggleGameStatus(game.id)}">${game.bought ? eyeOffIcon() : eyeIcon()}</div>
                    <a class="btn-icon btn-icon-edit" type="button" href="#/game/${game.id}/edit">${editIcon()}</a>
                    <a class="btn-icon btn-icon-danger" type="button" onclick="${dispatchRemoveGame(game.id)}">${deleteIcon()}</a>
                </div>
            </div>   
        `;
    }).join('');
}

/**
 * Добавление карточки
 * @param {Game} game 
 * @returns 
 */
export function appendGameCard(game) {
    const gameList = document.querySelector('.games__list');
    if (!gameList) return; 
    gameList.insertAdjacentHTML("beforeend", getGameCardTemplate([game]));
}

/**
 * Удаление карточки
 * @param {Number} gameId 
 */
export function removeGameCard(gameId) {
    const gameCard = document.querySelector(`.games__list .game[data-id="${gameId}"]`); // Найти карточку фильма
    gameCard.remove(); // Удалить карточку фильма
}

export function removeAllGameCards() {
    const gameCardList = document.querySelector('.games__list');
    while (gameCardList.firstChild)
        gameCardList.removeChild(gameCardList.lastChild);
}

export function rerenderGameCard(game) {
    const elem = document.querySelector(`.card.game[data-id="${game.id}"]`); // Найти элемент карточки
    if (!elem) return;
    const newElem = getGameCardTemplate([game]); // Создать новый элемент
    // Получить node нового элемента
    const newElemPlaceholder = document.createElement('div');
    newElemPlaceholder.innerHTML = newElem;
    const newElemNode = newElemPlaceholder.firstElementChild;
    // Заменить объект
    elem.replaceWith(newElemNode);
}

function validation(value) {
    return /*html*/`
        required
        oninvalid="this.setCustomValidity('Введие корректное ${value}');this.parentElement.classList.add('input-error')"
        oninput="this.setCustomValidity('');this.parentElement.classList.remove('input-error');"
    `
}

/**
 * Функция отрисовки модального окна
 */
export function renderModal(content) {
    const modal = fragment/*html*/`
    <div class="modal">
        <div class="modal-content">
        </div>
    </div>
    `;
    const modalContent = modal.querySelector('.modal-content');
    modalContent.appendChild(content);
    return modal;
}

export function removeModal() {
    const modal = document.querySelector('.modal');
    modal.remove();
}

export function renderRemoveConfirm(game) {
    const content = fragment/*html*/`
    <div class="remove-confitm">
        <h3>Вы действительно хотите удалить следующую игру: ${game.title}?</h3>
        <form class="form-remove-confirm">
            <button class="btn btn-danger" type="submit" value="confirm">Да</button>
            <button class="btn btn-green" type="submit" value="cancel">Нет</button>
        </form>
    </div>
    `;
    const form = content.querySelector('.form-remove-confirm');
    form.addEventListener('submit', (e) => handleRemoveConfirm(e, game.id));
    return content;
}

export function renderEditGame(game) {
    const page = fragment/*html*/`
    <div class="game-edit">
        <h1 class="page-title">Редактирование фильма<br> ${game.title}</h1>
        <form class="form-game-edit" method="post" data-game-id=${game.id}>
            <label class="form-label edit-form-label">
                <span class="edit-form-label-text">Название</span>
                <input type="text" class="input" placeholder="Измените название" value="${game.title}" ${validation('название фильма')} name="title"/>
            </label>
            <label class="form-label edit-form-label">
                <span class="edit-form-label-text">Описание</span>
                <textarea class="textarea" placeholder="Измените описание" name="description">${game.description}</textarea>
            </label>
            <label class="form-label edit-form-label">
                <span class="edit-form-label-text">Жанры</span>
                <input type="text" class="input" placeholder="Измените жанры, указав их через ';'" name="genres" value="${String(game.genres).replaceAll(',', ';')}" />
            </label>
            <label class="form-label edit-form-label">
                <span class="edit-form-label-text">Цена</span>
                <input type="number" class="filter-price" name="price" placeholder="Макс" min="0" value="${game.price}"/>
            </label>
            <label class="form-label edit-label">
                <span class="edit-form-label-text">Статус</span>
                <select class="input" name="status">
                    <option value="true" ${game.bought ? 'selected' : ''}>Куплена</option>
                    <option value="false" ${!game.bought ? 'selected' : ''}>Не куплена</option>
                </select>
            </label>
            <div class="edit-form-buttons">
                <button type="button" class="btn btn-primary" id="cancel-edit" onclick="history.back()">${backIcon()} Отменить изменения</button>
                <button type="submit" class="btn btn-primary" id="save-edit">${editIcon()} Сохранить изменения</button>
            </div>
        </form>
    </div>
    `;
    page.querySelector('.form-game-edit').addEventListener('submit', handleEditGame);
    return page;   
}


export function renderAddGameModal() {
    var modal = fragment/*html*/`
        <div class="modal modal-open">
            <div class="modal-content">
                <button class="modal-close" id="close-modal">${crossIcon()}</button>
                <form class="form-games-add" role="form" method="post">
                    <input class="games-title-input" type="text" name="title" placeholder="Название игры" ${validation('название игры')}>
                    <label>Описание</label>
                    <textarea placeholder="Описание" class="description-textarea" id="description-textarea" name="description"></textarea>
                    <label>Жанры</label>
                    <input placeholder="Жанры, разделенные ';'" class="genres-input" id="genres-input" name="genres"/>
                    <label>Цена</label>
                    <input type="number" class="games-title-input" name="price" placeholder="Цена" min="0" />                
                    <button class="btn btn-primary" type="submit" id="game-add-button">Добавить</button>
                </form>
            </div>
        </div>
    `;
    // Закрытие модального окна
    const closeModalButton = modal.querySelector('#close-modal');
    closeModalButton.addEventListener('click', handleCloseAddGameModal);

    // Добавление обработчика формы добавления игры
    const form = modal.querySelector('.form-games-add');
    form.addEventListener('submit', handleAddGameForm);
    
    return modal;
}
