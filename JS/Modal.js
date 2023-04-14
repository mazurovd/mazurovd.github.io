const about_btn = document.querySelector('.about_content-button');
const Hire_btn = document.querySelectorAll('.slider_button');
const modal = document.querySelector('.readMore_Modal');

const HireModal = document.querySelector('.HireUs-Modal');
const closeBtn = document.querySelector('.modal_close');
const HireCloseBtn = document.querySelector('.Hire_modal_close');

const ServModal = document.querySelector('.services-Modal');
const ServCloseBtn = document.querySelector('.Serv_modal_close');

ModalWindow(about_btn, modal, closeBtn);
for(var i=0; i<3;i++){
    ModalWindow(Hire_btn[i], HireModal, HireCloseBtn);
}


var services = document.querySelector('.services');
var MoreDetails_Mas = document.querySelectorAll('.services_item-MoreDetails');
var ServItemTitles = document.querySelectorAll('.services_item-title');
var MoreDetails_titlefield  = document.querySelector('.services-moreDetails_title');
var MoreDetails_textfield = document.querySelector('.services-moreDetails_text');

var MoreDetails_texts = new Array();
var MoreDetails_titles = new Array();

for(var i=0; i<MoreDetails_Mas.length; i++){
    MoreDetails_texts[i] = MoreDetails_Mas[i].textContent;
    MoreDetails_titles[i] = ServItemTitles[i].textContent;
}
var eveTarg;
services.onclick = () => {
    eveTarg = event.target;
    if ((Number(eveTarg.id)) > 0){
        MoreDetails_textfield.textContent = MoreDetails_texts[Number(eveTarg.id) - 1];
        MoreDetails_titlefield.textContent = MoreDetails_titles[Number(eveTarg.id) - 1];
        ModalWindowLight(eveTarg, ServModal, ServCloseBtn);
    }
};

function ModalWindowLight(openModalBtn, modal, closeBtn) {
    modal.classList.add("modal_active");

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', hideModal);

    function closeModal() {
        modal.classList.remove("modal_active");
        closeBtn.removeEventListener('click', closeModal);
        modal.removeEventListener('click', hideModal);
    }

    function hideModal(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function ModalWindow(openModalBtn, modal, closeBtn) {
    openModalBtn.onclick = () => {
        modal.classList.add("modal_active");

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', hideModal);

        function closeModal() {
            modal.classList.remove("modal_active");
            closeBtn.removeEventListener('click', closeModal);
            modal.removeEventListener('click', hideModal);
        }

        function hideModal(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    };
}
