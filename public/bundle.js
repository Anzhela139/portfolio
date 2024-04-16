/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/modules/carousel.js":
/*!*************************************!*\
  !*** ./src/app/modules/carousel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** инициализирует слайдер-карусель */
class Carousel {
  constructor() {
    this.items = [...document.querySelectorAll('.carousel .item')];
    this.currentItem = 0;
    this.isEnabled = true;
    this.init();
  }

  /**
   * @description - инициализирует слайдер-карусель
   */
  init() {
    document.querySelector('.control.left').addEventListener('click', this.handleShiftSlide.bind(this));
    document.querySelector('.control.right').addEventListener('click', this.handleShiftSlide.bind(this));
    let el = document.querySelector('.carousel');
    this.handleSwipe(el);
  }

  /**
   * @description - пролистывает слайды
   */
  handleShiftSlide(event) {
    const isPrev = event.target.closest('.control').classList.contains('left');
    if (!isPrev) {
      this.nextItem(this.currentItem);
    } else {
      this.previousItem(this.currentItem);
    }
  }

  /**
   * @description - изменяет номер текущего слайда
   * @param {Number} n - номер текущего слайда
   */
  changeCurrentItem(n) {
    this.currentItem = (n + this.items.length) % this.items.length;
  }

  /**
   * @description - прячет слайд
   * @param {String} direction - направление класса анимации
   */
  hideItem(direction) {
    this.isEnabled = false;
    this.items[this.currentItem].classList.add(direction);
    this.items[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('active', direction);
    });
  }

  /**
   * @description - показывает слайд
   * @param {String} direction - направление класса анимации
   */
  showItem(direction) {
    this.items[this.currentItem].classList.add('next', direction);
    this.items[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('active');
      this.isEnabled = true;
    });
  }

  /**
   * @description - обрабатываем предыдущий слайд
   */
  previousItem(n) {
    this.hideItem('to-right');
    this.changeCurrentItem(n - 1);
    this.showItem('from-left');
  }

  /**
   * @description - обрабатываем следующий слайд
   */
  nextItem(n) {
    this.hideItem('to-left');
    this.changeCurrentItem(n + 1);
    this.showItem('from-right');
  }

  /**
   * @description - хандлер перетаскивания
   * @param {HTMLDivElement} el - контейнер карусели
   */
  handleSwipe(el) {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;
    surface.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    }, false);
    surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (this.isEnabled) {
              this.previousItem(this.currentItem);
            }
          } else {
            if (this.isEnabled) {
              this.nextItem(this.currentItem);
            }
          }
        }
      }
      e.preventDefault();
    }, false);
    surface.addEventListener('touchstart', function (e) {
      if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
        if (e.target.classList.contains('left')) {
          if (this.isEnabled) {
            this.previousItem(this.currentItem);
          }
        } else if (e.target.classList.contains('right')) {
          if (this.isEnabled) {
            this.nextItem(this.currentItem);
          }
        }
      }
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    }, false);
    surface.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);
    surface.addEventListener('touchend', function (e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (this.isEnabled) {
              this.previousItem(this.currentItem);
            }
          } else {
            if (this.isEnabled) {
              this.nextItem(this.currentItem);
            }
          }
        }
      }
      e.preventDefault();
    }, false);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);

/***/ }),

/***/ "./src/app/modules/scrollEffects.js":
/*!******************************************!*\
  !*** ./src/app/modules/scrollEffects.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    if (o > headerHeight / 2) {
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
  handleChange(el, isBorder, isForward) {
    console.log(this.colorScheme);
    if (this.colorScheme === "light") {
      if (isForward) {
        el.animate({
          color: this.accent
        }, 10);
        el.css({
          "font-weight": "bold",
          ...(isBorder && {
            border: `1px solid ${this.accent}`
          })
        });
      } else {
        el.animate({
          color: this.white
        }, 10);
        el.css({
          "font-weight": "normal",
          ...(isBorder && {
            border: `1px solid ${this.white}`
          })
        });
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollEffects);

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../scss/styles.scss */ "./src/scss/styles.scss");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/carousel */ "./src/app/modules/carousel.js");
/* harmony import */ var _modules_scrollEffects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/scrollEffects */ "./src/app/modules/scrollEffects.js");




/** инициализирует приложение */
class App {
  constructor() {
    this.carousel = new _modules_carousel__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.scrollEffects = new _modules_scrollEffects__WEBPACK_IMPORTED_MODULE_2__["default"]();
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map