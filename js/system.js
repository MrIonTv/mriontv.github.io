"use strict";

// Fondo
const BACKGROUND = document.getElementById("background");
const SWITCH_THEME_BUTTON = document.getElementById("switch-theme");
const TOGGLE_ANIMATION_BUTTON = document.getElementById("toggle-animation");
// Dimensiones en píxeles de las figuras.
const MAX_FIGURE_SIZE = 200;  
// Tiempo de vida en ms.
const MAX_LIFE_TIME = 5000;
// Tiempos de aparicion entre grupos de cuadrados.
const MIN_APPEAR_TIME = 100; 
const MAX_APPEAR_TIME = 1000;
// Cantidad de figuras.
const MIN_FIGURES = 1;
const MAX_FIGURES = 4;

let animationInterval;
let isPaused = false;

// Función para obtener el valor de una variable CSS.
function getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Función para alternar el tema.
function switchTheme() {
    let theme = document.documentElement.getAttribute("data-theme");

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
    
    bgColor = getCSSVariable("--bg-color");
    updateThemeIcon();
}

// Función para aplicar el tema preferido del usuario.
function applyPreferredTheme() {
    const SAVED_THEME = localStorage.getItem("theme");
    if (SAVED_THEME) {
        document.documentElement.setAttribute("data-theme", SAVED_THEME);
    } else {
        const PREFERS_DARK_SCHEME = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (PREFERS_DARK_SCHEME) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    }

    bgColor = getCSSVariable("--bg-color");
    updateThemeIcon();
}

// Función para actualizar el icono del tema.
function updateThemeIcon() {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
        SWITCH_THEME_BUTTON.innerHTML = '<i class="fa-regular fa-sun"></i>';
    } else {
        SWITCH_THEME_BUTTON.innerHTML = '<i class="fa-regular fa-moon"></i>';
    }
}

// Función para generar figuras.
function generateFigures() {
    const FIGURES_QUANTITY = Math.floor(Math.random() * MAX_FIGURES) + MIN_FIGURES;
    const BACKGROUND_HEIGHT = BACKGROUND.offsetHeight; // Obtener la altura del fondo
    const BACKGROUND_WIDTH = BACKGROUND.offsetWidth; // Obtener el ancho del fondo
    
    for (let i = 0; i < FIGURES_QUANTITY; i++) {
        const FIGURE = document.createElement("div");
        FIGURE.classList.add("figure");

        const SIZE = Math.random() * (MAX_FIGURE_SIZE - 20) + 20; // Entre 20 y MAX_FIGURE_SIZE píxeles
        const POS_X = Math.random() * BACKGROUND_WIDTH;
        const POS_Y = Math.random() * BACKGROUND_HEIGHT;

        FIGURE.style.width = `${SIZE}px`;
        FIGURE.style.height = `${SIZE}px`;
        FIGURE.style.top = `${POS_Y}px`;
        FIGURE.style.left = `${POS_X}px`;
        FIGURE.style.borderColor = "rgba(0, 0, 0, 0.3)";
        FIGURE.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)"; // Sombra mejorada
        
        BACKGROUND.appendChild(FIGURE);
        FIGURE.animate(
            [
                { transform: "scale(0)" },
                { transform: "scale(1)" },
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: MAX_LIFE_TIME,
                easing: "ease-in-out",
                fill: "both"
            }
        );

        setTimeout(() => {
            FIGURE.remove();
        }, MAX_LIFE_TIME);
    }
}

// Función para detener o reanudar la animación.
function toggleAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    } else {
        animationInterval = setInterval(generateFigures, Math.random() * (MAX_APPEAR_TIME - MIN_APPEAR_TIME) + MIN_APPEAR_TIME);
    }
    updateAnimationIcon();
}

// Función para actualizar el icono de Animacion.
function updateAnimationIcon() {
    isPaused = !isPaused;
    if (isPaused) {
        TOGGLE_ANIMATION_BUTTON.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        TOGGLE_ANIMATION_BUTTON.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// Función que se llama cuando el DOM está listo.
function ready() {
    SWITCH_THEME_BUTTON.addEventListener("click", switchTheme);
    TOGGLE_ANIMATION_BUTTON.addEventListener("click", toggleAnimation);
    applyPreferredTheme();
    toggleAnimation(); // Iniciar la animación al cargar
}

// Variable para almacenar el color de fondo.
let bgColor;

// Preparar carga del sitio web.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
