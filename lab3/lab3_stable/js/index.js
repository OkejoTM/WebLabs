import { initTheme } from "./theme.js";
import { renderNotFound, renderGamesList, renderEditGame } from "./renders.js";
import {getGamesList, getGameById } from "./data.js";
import { initEvents, handleDropdown } from "./events.js";

const stylesLink = document.createElement("link");
stylesLink.rel = "stylesheet";
stylesLink.href = "css/index.css";
document.head.append(stylesLink);

document.addEventListener("DOMContentLoaded", start);

// Функция запуска
function start() {
    const root = document.getElementById("root"); //Корневой узел
    if (!root) return; //Узел не найден
    root.innerHTML = /*html*/`
      <div class="container">
        <div class="content"></div>
      </div>`; 
    root.addEventListener('click', handleDropdown);
    initTheme();
    initEvents();
    updateContent(); //Временно
}

export function updateContent() {
  const content = document.querySelector('.content');
  if (!content) return;
  content.replaceChildren(router());
}

// Маршрутизация
function router() {
  const hash = window.location.hash; // Текущее положение хеша
  if (hash === '')
    return renderGamesList(getGamesList());  
  else if (/^#\/game\/\d+\/edit/.test(hash)) {
    const gameId = hash.match(/^#\/game\/(\d+)\/edit/)[1]; // Id редактируемого фильма
    const game = getGameById(Number(gameId));
    if (!game) 
        return renderNotFound();
    return renderEditGame(game);
  }
  else 
      return renderNotFound();
}

window.addEventListener('hashchange', () => updateContent());

