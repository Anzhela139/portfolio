/** инициализирует эффекты прокрутки страницы */
class ScrollEffects {
    constructor() {
        this.navSocMenu = $(".nav_soc_wor_menu > li > a");
        this.navMainMenu = $(".nav_main_menu > li > a");
        this.navMainOrMenu = $(".nav_soc_or_menu>li>a");
        this.counterQ = $(".counter");
        this.colorScheme = "light";
        this.white = "#ffffff";
        this.accent = "#4c2e7e";

        this.init();
    }

    /**
     * @description - инициализирует эффекты прокрутки страницы
     */
    init() {
        $(window).on("scroll resize", this.handleScroll.bind(this));
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.colorScheme = "dark";
        }
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
            this.colorScheme = event.matches ? "dark" : "light";
        });
    }

    /**
     * @description - хандлер прокрутки
     */
    handleScroll() {
        let offsetSection1 = $("#mySkillset").offset();
        let headerHeight = $(".header").height();

        let o = $(window).scrollTop() - offsetSection1.top;
        if (o > (headerHeight / 2)) {
            this.handleChange(this.navSocMenu, false, true);
            this.handleChange(this.counterQ, true, true);
            this.counterQ.text("03");
        } else if (o > 0) {
            this.handleChange(this.navMainMenu, false, true);
            this.handleChange(this.navSocMenu, false, true);
            this.counterQ.text("02");
        } else if (o <= 0) {
            this.handleChange(this.navMainMenu, false, false);
            this.handleChange(this.navMainOrMenu, false, false);
            this.handleChange(this.navSocMenu, false, false);
            this.handleChange(this.counterQ, true, false);
            this.counterQ.text("01");
        }
    }

    /**
     * @description - хандлер изменения элементов с анимацией
     * @param {HTMLDivElement} el - элемент
     * @param {Boolean} isBorder - нужно ли изменять border
     * @param {Boolean} isForward - стили изменять вперед/обратно
     */
    handleChange( el, isBorder, isForward ) {
        console.log(this.colorScheme)
        if (this.colorScheme === "light") {
            if(isForward) {
                el.animate({ color: this.accent }, 10);
    
                el.css({
                    "font-weight": "bold",
                    ...(isBorder && {border: `1px solid ${this.accent}`})
                });
            } else {
                el.animate({ color: this.white }, 10);  
                el.css({
                    "font-weight": "normal",
                    ...(isBorder && {border: `1px solid ${this.white}`})
                });
            }
        }
    }
}

export default ScrollEffects;