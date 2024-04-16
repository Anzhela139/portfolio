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
                    if ((distX > 0)) {
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
                    if ((distX > 0)) {
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

export default Carousel;