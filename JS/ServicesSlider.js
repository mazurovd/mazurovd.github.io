var slidesCopy = document.querySelectorAll('.services_item'); // массив слайдов
var slidesS = new Array();
for (i = 0; i < slidesCopy.length; i++) {
    slidesS[i] = slidesCopy[i]; // Коп-ем слайды в нов масс и далее раб-м тольк с ним 
}
var kr_p = 3; // Номер крайнего слайда справа
let kr_l = 1; // Номер крайнего слайда слева

const ArrowL_Btn = document.querySelector('.services_items-LeftArrow');
const ArrowR_Btn = document.querySelector('.services_items-RightArrow');

for (let num0 = 0; num0 < slidesS.length; num0++) { // Назначм всем слам номера по порядку
    slidesS[num0].style.order = (num0 + 1);
}
const slideFirst = slidesS[0];
const slidesAll = new Array(slidesS.length); // Масс для хранения div-ов слайдов 
for (var i = 0; i < slidesAll.length; i++) {
    slidesAll[i] = new Array(2);
    slidesAll[i][0] = slidesS[i].querySelector('.services_item-title').textContent;
    slidesAll[i][1] = slidesS[i].querySelector('.services_item-text').textContent;
} // В этом 2-ом массиве храним заголовки и тексты всех слайдов 

let widthScreen = document.documentElement.clientWidth;
if (slidesS.length > 3 && widthScreen > 768) { //Удаляем все элементы, кроме первых трех
    for (let i = 3; i < slidesS.length; i++) {
        slidesS[i].parentNode.removeChild(slidesS[i]);
    }
}

let slickTime = 480;
slidesS[1].classList.add('ServActive'); // Цент-ый (вто-й из 3-х) слайд выд-ся цветом

const widthSlide = slidesCopy[0].offsetWidth; //Получаем ширину слайда
var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
root.style.setProperty('--widthR', -widthSlide + 'px'); //Уст. пер. ш-ну сл
root.style.setProperty('--widthL', widthSlide + 'px'); //для перехда аним.

window.onresize = function (event) { // Автоматическое обновление страницы при изм-ии ширины
    window.location.reload(); // Вызов ф-ии обновления страницы
};
//////////////////////////////////////////////////////////////////////////////////////////////


function ServChangeSlide(sign) { // Главн ф-ия. Вызыв-ся при нажатии на стрелку
    if (document.documentElement.clientWidth <= 768) {
        changeSlideMedia(sign);
    } else {
        if (sign < 0) { // Щелк на левую кнопку
            ClickLeftBtn();
        } else { // Щелк на правую кнопку
            ClickRightBtn();
        }
    }
}

let indexSlid = 0;
var howIndexSl = 0;
var smenaWidth = 0;
var first;

function changeSlideMedia(sign) {
    for (let numSl = 0; numSl < slidesS.length; numSl++) {
        slidesS[numSl].classList.remove('ServActiveMedia');
        slidesS[numSl].classList.remove('rightAnim');
        slidesS[numSl].classList.remove('leftAnim');
    }

    indexSlid += sign; // Смена номера слайда

    if (sign < 0) {
        if (indexSlid < 0) {
            indexSlid += slidesS.length;
        }
        slidesS[indexSlid].classList.add('leftAnim');
    } else {
        if (indexSlid == slidesS.length) {
            indexSlid -= slidesS.length;
        }
        slidesS[indexSlid].classList.add('rightAnim');
    }

    slidesS[indexSlid].classList.add('ServActiveMedia'); // Смена слайда
}


function ClickLeftBtn() {
    On_Off_Click(0); // Отключает кликабельность кнопки
    resetSlActive(slidesS); // Сбрасывает активный класс со всех слайдов
    for (let numSl = 0; numSl < slidesS.length; numSl++) {
        Animation('LeftAnim', slidesS, numSl); // Анимация слайда (переход вправо)
        if (slidesS[numSl].style.order == 3) { //выб-ем кр.пр слайд
            setTimeout(() => {
                slidesS[numSl].parentNode.removeChild(slidesS[numSl]); //уд. его
                if (kr_p == 1) { //если кр.пр слайд - первый
                    kr_p = slidesAll.length; //кр. пр-ым становится наиб. слайд
                } else kr_p--; //иначе кр.пр-м стан-ся меньший на ед-цу (т.к. левая кнопка дв-ет сл-ды назад)
                if (kr_l == 1) { //Если кр.лев слайд - первый
                    createNewSlide(slidesAll.length, 1); //Создать новый - наиб-ий и поставить первым
                    kr_l = slidesAll.length; //Обновить кр.левый до максим-го номера (т.к. кр.лев теперь посл-ий)
                } else { //Если кр.лев слайд не первый, 
                    createNewSlide(--kr_l, 1); //то кр.левый делаем на ед-цу меньше, т.к. лев.кнопка двигает сл-ды вправо. И создаем новый, меньший на единицу и ставим его первым
                }
            }, slickTime);
        } else {
            setTimeout(() => {
                slidesS[numSl].style.order = Number(slidesS[numSl].style.order) + 1;
                if (slidesS[numSl].style.order == 2) {
                    slidesS[numSl].classList.add('ServActive');
                } else {
                    slidesS[numSl].classList.remove('ServActive');
                }
            }, slickTime);
        }
    }
}

function ClickRightBtn() {
    On_Off_Click(0);
    resetSlActive(slidesS);
    for (let numSl = 0; numSl < slidesS.length; numSl++) {
        Animation('RightAnim', slidesS, numSl);
        if (slidesS[numSl].style.order == 1) {
            setTimeout(() => {
                slidesS[numSl].parentNode.removeChild(slidesS[numSl]); // Удаляем кр. левый эл.т
                if (kr_l == slidesAll.length) { //Если кр.л равен посл-му
                    kr_l = 1;
                } else kr_l++;
                if (kr_p != slidesAll.length) { // Если элемент не посл
                    createNewSlide(++kr_p, 3); //
                } else {
                    kr_p = 1;
                    createNewSlide(kr_p, 3);
                }
            }, slickTime);
        } else {
            setTimeout(() => {
                slidesS[numSl].style.order = Number(slidesS[numSl].style.order) - 1;
                if (slidesS[numSl].style.order == 2) {
                    slidesS[numSl].classList.add('ServActive');
                } else {
                    slidesS[numSl].classList.remove('ServActive');
                }
            }, slickTime);
        }
    }
}

function On_Off_Click(duo) { // Вкл/Выкл кликабельность стрел-ой кн-ки
    if (duo == 0) {
        ArrowL_Btn.classList.add('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn.classList.add('pointerEvents'); // Отключает кликабельность кнопки R
    } else if (duo == 1) {
        ArrowL_Btn.classList.remove('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn.classList.remove('pointerEvents'); // Отключает кликабельность кнопки R
    }
}

function resetSlActive(slides) { // Сбрасывает активный класс со всех слайдов
    for (let num = 0; num < slides.length; num++) {
        slides[num].classList.remove('ServActive');
    }
}

function Animation(animType, slides, num) { // Анимация слайда (переход вправо)
    if (animType == 'LeftAnim') {
        if (slides[num].style.order == 3) {
            goingAnim_unlockBtn('ServleftAnimK', slides, num);
        } else {
            goingAnim_unlockBtn('ServleftAnim', slides, num);
        }
    } else if (animType == 'RightAnim') {
        if (slides[num].style.order == 1) {
            goingAnim_unlockBtn('ServrightAnimK', slides, num);
        } else {
            goingAnim_unlockBtn('ServrightAnim', slides, num);
        }
    }
}

function goingAnim_unlockBtn(classAnim, slides, num) {
    slides[num].classList.add(classAnim);
    setTimeout(() => {
        slides[num].classList.remove(classAnim), On_Off_Click(1);
    }, slickTime);
}

function createNewSlide(numSlide, ord) {
    var newItem = document.createElement('div');
    var items = document.querySelector('.services_items');
    newItem.classList.add('services_item');
    parentElement = ArrowL_Btn.parentNode;
    parentElement.insertBefore(newItem, ArrowL_Btn);
    newItem.style.order = ord;

    var newItem_img = document.createElement('div');
    setMyElement(newItem_img, newItem, 'services_item-img');

    var newItem_image = document.createElement('img');
    setMyElement(newItem_image, newItem_img, 'services_item-image');
    newItem_image.src = "images/serv-item-img.png";
    newItem_image.alt = "";

    var newItem_title = document.createElement('div');
    setMyElement(newItem_title, newItem, 'services_item-title');
    newItem_title.textContent = slidesAll[numSlide - 1][0];

    var newItem_text = document.createElement('div');
    setMyElement(newItem_text, newItem, 'services_item-text');
    newItem_text.textContent = slidesAll[numSlide - 1][1];

    var newItem_button = document.createElement('a');
    setMyElement(newItem_button, newItem, 'services_item-button');
    newItem_button.textContent = 'more details';
    newItem_button.id = numSlide;

    slidesS.push(newItem); // добавляем новый эл. ко всем в массив
}

function setMyElement(elem, conteiner, classN) { // Доб. эл. в конт. и уст. клсс
    conteiner.appendChild(elem);
    elem.classList.add(classN);
}
