/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function calc() {
  // Calculator

  const result = document.querySelector('.calculating__result span');
  let height, weight, age, sex, ratio;

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  function setLocaleSettings(selector, activeClass) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(e => {
      e.classList.remove(activeClass);
      if (e.getAttribute('id') === localStorage.getItem('sex')) {
        e.classList.add(activeClass);
      }
      if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        e.classList.add(activeClass);
      }
    });
  }

  setLocaleSettings('#gender div', 'calculating__choose-item_active');
  setLocaleSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.innerHTML = '<p class="calculating__subtitle" style="margin: 5px">   Введите ваши параметры</p>';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) + ' ккал';
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio) + ' ккал';
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else if (input.value != '') {
        input.style.border = '1px solid green';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
};

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function cards() {
  //Menu Csrds
  class MenuItem {
    constructor(
      src,
      alt,
      title,
      descr,
      totalCoast,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.totalCoast = totalCoast;
      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
      this.parent = document.querySelector(parentSelector);
    }
    changeToUAH() {
      this.totalCoast *= this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.totalCoast}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} status: ${status}`);
    }

    return await res.json();
  };

  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //     });

  //getting data from .json

  axios.get("http://localhost:3000/menu").then((object) => {
    object.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuItem(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  //getting data from database
  //   axios.get("http://dist/server.php").then(({ data: res }) => {
  //     if (res.status === 200) {
  //       res.data.forEach(({ img, title, descr, price }) => {
  //         new MenuItem(img, "", title, descr, price, ".menu .container").render();
  //       });
  //     }
  //   });

};

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function forms() {
  //Forms
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    fail: "Что то пошло не так",
  };

  forms.forEach((item) => {
    bindPostingData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostingData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          thanksModalShow(message.success);

          statusMessage.remove();
        })
        .catch(() => {
          thanksModalShow(message.fail);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function thanksModalShow(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
      `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json());
};

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function modal() {
  // Modal Window
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(modatTimerId);
  }
  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });
  const modatTimerId = setInterval(openModal, 15000);

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  function openModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", openModalByScroll);
    }
  }
  window.addEventListener("scroll", openModalByScroll);
};

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function slider() {
  //Slider
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = ".5");
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  //Variant №1
  // slides.forEach((item, i) => {
  //     if(i!= 0){
  //         item.classList.add('hide');
  //     } else {
  //         current.textContent = '0' + (1+i);
  //     }
  // });
  // prevBtn.addEventListener('click', () => {
  //     let numI;
  //     slides.forEach((e, i) => {
  //         if(!e.classList.contains('hide')){
  //             numI = i;
  //         }
  //     });

  //     slides[numI].classList.add('hide');
  //     if(numI == 0){
  //         numI = 4;}
  //     numI--;
  //     slides[numI].classList.remove('hide');
  //     current.textContent = `0${numI + 1}`;

  // });

  // netxBtn.addEventListener('click', () => {
  //     let numI;
  //     slides.forEach((e, i) => {
  //         if(!e.classList.contains('hide')){
  //             numI = i;
  //         }
  //     });

  //     slides[numI].classList.add('hide');
  //     if(numI == 3){
  //         numI = -1;}
  //     numI++;
  //     slides[numI].classList.remove('hide');
  //     current.textContent = `0${numI + 1}`;

  // });
};

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function tabs() {
  //Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function timer(){
  //Timer

  const deadline = new Date("2020-06-31");

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function updateClock() {
      const t = getTimeRemaining(endtime);
      if (t.days <= 0) {
        days.textContent = getZero(0);
        hours.textContent = getZero(0);
        minutes.textContent = getZero(0);
        seconds.textContent = getZero(0);
      } else {
        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);
      }
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
  const timerEndTime = document.querySelector(".deadline");
  timerEndTime.textContent =
    `Акция закончится ${deadline.getDate()} июня ${deadline.getFullYear()} года 
  в ${deadline.getHours()} часов 00 минут`;
};

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

document.body.onload = () => {
  const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
  
  calc();
  cards();
  forms();
  modal();
  slider();
  tabs();
  timer();
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map