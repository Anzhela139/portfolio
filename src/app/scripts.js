let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.control.right').addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem);
    }
});



const swipedetect = (el) => {
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
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);

    surface.addEventListener('touchstart', function (e) {
        if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
            if (e.target.classList.contains('left')) {
                if (isEnabled) {
                    previousItem(currentItem);
                }
            } else if (e.target.classList.contains('right')) {
                if (isEnabled) {
                    nextItem(currentItem);
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
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);
}

let el = document.querySelector('.carousel');
swipedetect(el)

let buttonUp = document.querySelector('nav-button_up');
let buttonDown = document.querySelector('nav-button_down');

let menuMobile = document.querySelector('.nav_main_menu');
let burgerButton = document.querySelector('#btn-burger_menu');
let layersBurgerButton = document.querySelector('.nav-menu_burger');

burgerButton.onclick = function () {
    burgerButton.classList.toggle('btn-burger_menu_cross');
    menuMobile.classList.toggle('active');
    menuMobile.classList.toggle('hide-menu');
};

$(window).on("scroll resize", function () {
    var offsetSection1 = $("#mySkillset").offset();
    var headerHeight = $(".header").height();

    var o = $(window).scrollTop() - offsetSection1.top;
    if (o > (headerHeight / 2)) {
        $(".nav_soc_wor_menu>li>a").animate({ color: '#4c2e7e' }, 10);
        $(".nav_soc_wor_menu>li>a").css({
            'font-weight': 'bold',
        });
        $(".counter").animate({ color: '#4c2e7e', }, 10);
        $(".counter").css({
            'font-weight': 'bold',
            border: '2px solid #4c2e7e'
        });

        document.querySelector('.counter').textContent = "03";
    } else if (o > 0) {
        $(".nav_main_menu>li>a").animate({ color: '#4c2e7e' }, 10);
        $(".nav_main_menu>li>a").css({
            'font-weight': 'bold',
        });
        $(".nav_soc_or_menu>li>a").animate({ color: '#4c2e7e' }, 10);
        $(".nav_soc_or_menu>li>a").css({
            'font-weight': 'bold',
        });

        document.querySelector('.counter').textContent = "02";
    } else if (o <= 0) {
        $(".nav_main_menu>li>a").animate({ color: '#ffffff' }, 10);
        $(".nav_main_menu>li>a").css({
            'font-weight': 'normal',
        });
        $(".nav_soc_or_menu>li>a").animate({ color: '#ffffff' }, 10);
        $(".nav_soc_or_menu>li>a").css({
            'font-weight': 'normal',
        });
        $(".nav_soc_wor_menu>li>a").animate({ color: '#ffffff' }, 10);
        $(".nav_soc_wor_menu>li>a").css({
            'font-weight': 'normal',
        });
        $(".counter").animate({ color: '#ffffff', }, 10);
        $(".counter").css({
            'font-weight': 'normal',
            border: '1px solid #ffffff'
        });
        document.querySelector('.counter').textContent = "01";
    }
})