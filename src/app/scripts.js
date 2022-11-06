import Carousel from "./modules/carousel";
import ScrollEffects from "./modules/scrollEffects";

/** инициализирует приложение */
class App {
    constructor() {
        this.carousel = new Carousel();
        this.scrollEffects = new ScrollEffects();
        this.menuMobile = document.querySelector('.nav_main_menu');
        this.burgerButton = document.querySelector('#btn-burger_menu');

        this.init();
    }

    /**
     * @description - инициализирует приложение
     */
    init() {
        this.burgerButton.addEventListener('click', this.handleBurgerMenu.bind(this));
    }

    /**
     * @description - хандлер мобильного бургер-меню
     */
    handleBurgerMenu() {
        this.burgerButton.classList.toggle('btn-burger_menu_cross');
        this.menuMobile.classList.toggle('active');
        this.menuMobile.classList.toggle('hide-menu');
    }
}

document.addEventListener("DOMContentLoaded", new App());
