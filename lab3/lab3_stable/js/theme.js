import { moonIcon, sunIcon } from "./icons.js";

// Получит текущую тему
function getTheme() {
    function getSystemTheme() { //Получить системную тему
        if (!window.matchMedia) return "light";
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    return localStorage.getItem("theme") || getSystemTheme(); // Вернуть текущую тему
}

// Переключение темы
function themeToggle() {
    const theme = getTheme(); // Получить текущую тему
    const newTheme = theme === "dark" ? "light" : "dark"; // Получить тему после переключения
    localStorage.setItem("theme", newTheme); // Изменить тему в localStorage
    // Переключить тему
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
}

// Отрисовка переключателя темы
function renderThemeToggle() {
    document.body.addEventListener("click", (e) => {
        if (!(e.target instanceof Element)) return;
        const themeBtn = e.target.closest(".theme-toggle__button"); //Кнопка переключения темы
        if (themeBtn) { // Если была нажата кнопка переключения темы
            themeToggle(); // Переключить тему
        }
    });
    // Отрисовка кнопки переключения темы
    return `
        <div class="theme-toggle">
            <button class="theme-toggle__button">
                ${moonIcon()}
                ${sunIcon()}
            </button>
        </div>    
    `
}

export function initTheme() {
    document.body.classList.add(getTheme()); //Установить тему
    const container = document.querySelector(".container");
    if (!container) return;
    container.insertAdjacentHTML('beforeend', renderThemeToggle()); // Добавить кнопку смены темы
}

