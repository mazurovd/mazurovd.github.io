var slidesCopy_ = document.querySelectorAll('.feedback_persons-item'); // массив слайдов
var slidesS_ = new Array();
for (i = 0; i < slidesCopy_.length; i++) {
    slidesS_[i] = slidesCopy_[i]; // Коп-ем слайды в нов масс и далее раб-м тольк с ним 
}
var kr_p_ = 3; // Номер крайнего слайда справа
let kr_l_ = 1; // Номер крайнего слайда слева
const ArrowL_Btn_ = document.querySelector('.feedback_persons-quote_Lbtn');
const ArrowR_Btn_ = document.querySelector('.feedback_persons-quote_Rbtn');
if (document.documentElement.clientWidth > 600) {
    for (let num0 = 0; num0 < slidesS_.length; num0++) { // Назначм всем слам номера по порядку
        slidesS_[num0].style.order = (num0 + 1);
        slidesS_[num0].style.opacity = 0.2;
    }
}
var numActSl = 0;
if (document.documentElement.clientWidth <= 950) { //Для планш. и менее
    numActSl = 1; //активный (яркий) слайд - второй (центральный)
}
slidesS_[numActSl].style.opacity = 1;
const slidesAll_ = new Array(slidesS_.length); // Масс для хранения div-ов слайдов 
var item_quote = document.querySelector('.feedback_persons-quote_text');
for (var i = 0; i < slidesAll_.length; i++) { // Хранение инф о слайдах
    slidesAll_[i] = new Array(5);
    slidesAll_[i][0] = slidesS_[i].querySelector('.feedback_persons-item_img').src;
    slidesAll_[i][1] = slidesS_[i].querySelector('.feedback_persons-item_count').textContent;
    slidesAll_[i][2] = slidesS_[i].querySelector('.feedback_persons-item_name').textContent;
    slidesAll_[i][3] = slidesS_[i].querySelector('.feedback_persons-item_proff').textContent;
    slidesAll_[i][4] = slidesS_[i].querySelector('.feedback_persons-item_quote').textContent;
} // В этом 2-ом массиве храним заголовки и тексты всех слайдов 
let widthScreen_ = document.documentElement.clientWidth;
if (slidesS_.length > 3 && widthScreen_ > 600) { //Удаляем все элементы, кроме первых трех
    var slidesS_Length = slidesS_.length;
    for (let i = 3; i < slidesS_Length; i++) {
        slidesS_[i].parentNode.removeChild(slidesS_[i]); // Удаление DOM-слайдов
    }
    for (let n = 3; n < slidesS_Length; n++) {
        slidesS_.splice(n, slidesS_Length - 3); // Удаление ссылок на слайды (массив)
    }
}
let slickTime_ = 480;
const widthSlide_ = slidesCopy_[0].offsetWidth; //Получаем ширину слайда
var root_ = document.querySelector(':root');
var rootStyles_ = getComputedStyle(root_);
root_.style.setProperty('--widthRi', -widthSlide_ - 22 + 'px'); //Уст. пер. ш-ну сл
root_.style.setProperty('--widthLe', widthSlide_ + 22 + 'px'); //для перехда аним.
window.onresize_ = function (event) { // Автоматическое обновление страницы при изм-ии ширины
    window.location.reload(); // Вызов ф-ии обновления страницы
};
var numSlAll = document.querySelector('.feedback_persons-quote_numAll');
var numSlNow = document.querySelector('.feedback_persons-quote_num');
numSlAll.textContent = slidesAll_.length;
var numSlStartMedia = document.querySelector('.feedback_persons-quote_num');
if(document.documentElement.clientWidth <= 950 && document.documentElement.clientWidth > 600){
    numSlStartMedia.textContent = '2';
    item_quote.textContent =  slidesAll_[Number(1)][4];
}
var ordActSl = 1; //Порядковый номер активного слайда (яркого)
var mobile = false;
//////////////////////////////////////////////////////////////////////////////////////////////
function FeedChangeSlide(sign) { // Главн ф-ия. Вызыв-ся при нажатии на стрелку
    if ((document.documentElement.clientWidth <= 950)) {
        if (document.documentElement.clientWidth <= 600) {
            changeSlideMedia_(sign);
            mobile = true;
        }
        else {
            ordActSl = 2; //Порядковый номер активного слайда (яркого)
            root_.style.setProperty('--opacityR_K', 0.2); //кр. лев. слайд делаем при анимации = 0.2 до 0
        }
    }
    if (mobile == false) {
        if (sign < 0) { // Щелк на левую кнопку
            ClickLeftBtn_();
        }
        else { // Щелк на правую кнопку
            ClickRightBtn_();
        }
        setTimeout(() => {
            for (let numSl = 0; numSl < slidesS_.length; numSl++) {
                if (slidesS_[numSl].style.order != ordActSl) { // Все, кроме 
                    slidesS_[numSl].style.opacity = 0.2; //кр. левого будут тусклые
                }
                else {
                    slidesS_[numSl].style.opacity = 1;
                    var IndKrL = numSl; //Сохраняем индекс активного слайда
                }
            }
            var numKrLSl = slidesS_[IndKrL].querySelector('.feedback_persons-item_count').textContent; //
            item_quote.textContent = slidesAll_[Number(numKrLSl - 1)][4]; //Вставляем в цитату выск. из слайда
            numSlNow.textContent = Number(numKrLSl); //Вставляем в счетчик номер, взятый из тега кр.л. слайда
        }, slickTime_);
    }
}
let indexSlid_ = 0;

function changeSlideMedia_(sign_) {
    for (let numSl = 0; numSl < slidesS_.length; numSl++) {
        slidesS_[numSl].classList.remove('FeedActiveMedia');
        slidesS_[numSl].classList.remove('rightAnim');
        slidesS_[numSl].classList.remove('leftAnim');
    }
    indexSlid_ += sign_; // Смена номера слайда
    if (sign_ < 0) {
        if (indexSlid_ < 0) {
            indexSlid_ += slidesS_.length;
        }
        slidesS_[indexSlid_].classList.add('leftAnim');
    }
    else {
        if (indexSlid_ == slidesS_.length) {
            indexSlid_ -= slidesS_.length;
        }
       slidesS_[indexSlid_].classList.add('rightAnim');
    }
    slidesS_[indexSlid_].classList.add('FeedActiveMedia'); // Смена слайда */
    
     var numActSl = slidesS_[indexSlid_].querySelector('.feedback_persons-item_count').textContent; //
            item_quote.textContent = slidesAll_[Number(numActSl - 1)][4]; //Вставляем в цитату выск. из слайда
            numSlNow.textContent = Number(numActSl); //Вставляем в счетчик номер, взятый из тега кр.л. слайда
}

function ClickLeftBtn_() {
    On_Off_Click_(0); // Отключает кликабельность кнопки
    for (let numSl = 0; numSl < slidesS_.length; numSl++) {
        Animation_('LeftAnim', slidesS_, numSl); // Анимация слайда (переход вправо)
        if (slidesS_[numSl].style.order == 3) { //выб-ем кр.пр слайд
            setTimeout(() => {
                slidesS_[numSl].parentNode.removeChild(slidesS_[numSl]); //уд. его
                slidesS_.splice(numSl, 1); //65465467476465
                if (kr_p_ == 1) { //если кр.пр слайд - первый
                    kr_p_ = slidesAll_.length; //кр. пр-ым становится наиб. слайд
                }
                else kr_p_--; //иначе кр.пр-м стан-ся меньший на ед-цу (т.к. левая кнопка дв-ет сл-ды назад)
                if (kr_l_ == 1) { //Если кр.лев слайд - первый
                    createNewSlide_(slidesAll_.length, 1, 'inception'); //Создать новый - наиб-ий и поставить первым
                    kr_l_ = slidesAll_.length; //Обновить кр.левый до максим-го номера (т.к. кр.лев теперь посл-ий)
                }
                else { //Если кр.лев слайд не первый, 
                    createNewSlide_(--kr_l_, 1, 'inception'); //то кр.левый делаем на ед-цу меньше, т.к. лев.кнопка двигает сл-ды вправо. И создаем новый, меньший на единицу и ставим его первым
                }
            }, slickTime_);
        }
        else {
            setTimeout(() => {
                slidesS_[numSl].style.order = Number(slidesS_[numSl].style.order) + 1;
            }, slickTime_);
        }
    }
} //kr_l_ = 6 (5), kr_p_ = 2 (1)
function ClickRightBtn_() { //kr_l_ = 1, kr_p_ = 3
    On_Off_Click_(0);
    var slidesS_LengthRbtn = slidesS_.length;
    for (let numSl = 0; numSl < slidesS_LengthRbtn; numSl++) {
        Animation_('RightAnim', slidesS_, numSl);
        if (slidesS_[numSl].style.order == 1) {
            setTimeout(() => {
                slidesS_[numSl].parentNode.removeChild(slidesS_[numSl]); // Удаляем кр. левый эл.т
                slidesS_.splice(numSl, 1); //54776587687
                slidesS_[numSl].style.order = 1; ////////////////////////////////
                if (kr_l_ == slidesAll_.length) { //Если кр.л равен посл-му
                    kr_l_ = 1;
                }
                else kr_l_++; // 2
                if (kr_p_ != slidesAll_.length) { // Если элемент не посл
                    createNewSlide_(++kr_p_, 4, 'end'); //Новый эл-т с пор 4, т.к. на след. шаге б. умен 
                }
                else {
                    kr_p_ = 1;
                    createNewSlide_(kr_p_, 4, 'end');
                }
            }, slickTime_);
        }
        else {
            setTimeout(() => {
                slidesS_[numSl].style.order = Number(slidesS_[numSl].style.order) - 1;
            }, slickTime_);
        }
    }
}

function On_Off_Click_(duo_) { // Вкл/Выкл кликабельность стрел-ой кн-ки
    if (duo_ == 0) {
        ArrowL_Btn_.classList.add('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn_.classList.add('pointerEvents'); // Отключает кликабельность кнопки R
    }
    else if (duo_ == 1) {
        ArrowL_Btn_.classList.remove('pointerEvents'); // Отключает кликабельность кнопки L
        ArrowR_Btn_.classList.remove('pointerEvents'); // Отключает кликабельность кнопки R
    }
}

function resetSlActive_(slides_) { // Сбрасывает активный класс со всех слайдов
    for (let num = 0; num < slides_.length; num++) {
        slides_[num].classList.remove('ServActive');
    }
}

function Animation_(animType_, slides_, num) { // Анимация слайда (переход вправо)
    if (animType_ == 'LeftAnim') {
        if (slides_[num].style.order == 3) {
            goingAnim_unlockBtn_('FeedleftAnimK', slides_, num);
        }
        else {
            for (var i = 0; i < slides_.length; i++) {
                slides_[i].classList.remove('FeedrightAnim');
            }
            goingAnim_unlockBtn_('FeedleftAnim', slides_, num);
        }
    }
    else if (animType_ == 'RightAnim') {
        if (slides_[num].style.order == 1) {
            goingAnim_unlockBtn_('FeedrightAnimK', slides_, num);
        }
        else {
            goingAnim_unlockBtn_('FeedrightAnim', slides_, num);
        }
    }
}

function goingAnim_unlockBtn_(classAnim_, slides_, num) {
    root_.style.setProperty('--time', slickTime_ / 990 + 's'); // Ставм врмя аним боле 0.5s
    slides_[num].classList.add(classAnim_);
    setTimeout(() => {
        root_.style.setProperty('--time', 0 + 's'); // Делаем время аним меньше 0
        slides_[num].classList.remove(classAnim_), On_Off_Click_(1);
    }, slickTime_);
}

function createNewSlide_(numSlide_, ord_, position) {
    var newItem = document.createElement('div');
    var items = document.querySelector('.feedback_persons-items');
    if (position == 'end') {
        setMyElement_(newItem, items, 'feedback_persons-item');
    }
    else if (position == 'inception') {
        var itemsFirstChild = items.firstChild;
        newItem.classList.add('feedback_persons-item');
        items.insertBefore(newItem, itemsFirstChild);
    }
    else return 0;
    newItem.style.order = ord_;
    var newItem_image = document.createElement('img');
    setMyElement_(newItem_image, newItem, 'feedback_persons-item_img');
    newItem_image.src = slidesAll_[numSlide_ - 1][0];;
    newItem_image.alt = "";
    var newItem_info = document.createElement('div');
    setMyElement_(newItem_info, newItem, 'feedback_persons-item_info');
    var newItem_count = document.createElement('span');
    setMyElement_(newItem_count, newItem_info, 'feedback_persons-item_count');
    newItem_count.textContent = slidesAll_[numSlide_ - 1][1];
    var newItem_about = document.createElement('div');
    setMyElement_(newItem_about, newItem_info, 'feedback_persons-item_about');
    var newItem_name = document.createElement('div');
    setMyElement_(newItem_name, newItem_about, 'feedback_persons-item_name');
    newItem_name.textContent = slidesAll_[numSlide_ - 1][2];
    var newItem_proff = document.createElement('div');
    setMyElement_(newItem_proff, newItem_about, 'feedback_persons-item_proff');
    newItem_proff.textContent = slidesAll_[numSlide_ - 1][3];
    if (position == 'end') {
        slidesS_.push(newItem); // добавляем новый эл. ко всем в массив
    }
    else if (position == 'inception') {
        slidesS_.unshift(newItem);
    }
}

function setMyElement_(elem_, conteiner_, classN_) { // Доб. эл. в конт. и уст. клсс
    conteiner_.appendChild(elem_);
    elem_.classList.add(classN_);
}