const menuItems = document.querySelector('.menu_items');

let indicMenu = 0;

function OpenCloseMenu(){ // При клике на бар выходит меню или скр
    if(indicMenu == 0){
        menuItems.classList.add('displayBlock'); // ul становится block 
        menuItems.classList.remove('displayNone');
        menuItems.classList.remove('AnimationOut'); //Убрать ан-ию скрытия меню
        menuItems.classList.add('AnimationOpen');
        indicMenu = 1;
    }
    else{
        menuItems.classList.remove('AnimationOpen');
        menuItems.classList.add('AnimationOut'); 
        setTimeout(() => { //устан-ем none спустя задержку после ан-ии скр-я
            menuItems.classList.remove('displayBlock'),
            menuItems.classList.remove('AnimationOut'); 
        }, 1000); //Иначе none установится одн-но с ан-ей и ан-ию не увидим
        indicMenu = 0;
    }
}













