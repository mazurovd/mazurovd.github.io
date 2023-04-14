const slides = document.querySelectorAll('.header_slider-item');
const btnL = document.querySelector('.header_slider-items_slick_btn-L');
const btnR = document.querySelector('.header_slider-items_slick_btn-R');

let indexSlide = 0;

btnL.style.cursor = "default";
btnL.classList.add('pointerEvents');


function changeSlide(sign){
  for(let numSl=0; numSl<slides.length; numSl++){
    slides[numSl].classList.remove('active');
    slides[numSl].classList.remove('rightAnim');
    slides[numSl].classList.remove('leftAnim');
  }
  
  indexSlide += sign; // Смена номера слайда
  
   if(sign<0){
    slides[indexSlide].classList.add('leftAnim');
  }
  else{
     slides[indexSlide].classList.add('rightAnim');
  }
  
  if(indexSlide >= slides.length){
    indexSlide = slides.length-1;
  }
  else if(indexSlide < 0){
    indexSlide = 0;
  }

  indicBtn(0, btnL);
  indicBtn(slides.length-1, btnR);
 
  slides[indexSlide].classList.add('active'); // Смена слайда
}


function indicBtn(numLast, btn){ // Индикация кнопок
  if(indexSlide == numLast){
    btn.style.cursor = "default";
    btn.classList.add('pointerEvents'); // отключение клика
  }
  else{
    btn.style.cursor = "pointer";
    btn.classList.remove('pointerEvents');
  }
}

///////// DownList //////////
var downlistPage = document.querySelector('.down_listParent');
var downList = document.querySelector('.down_list');

downlistPage.onmouseover = () => {
    downList.classList.add("down_listActive");
};
downlistPage.onmouseout = () => {
    downList.classList.remove("down_listActive");
};
///////// DownList //////////



















