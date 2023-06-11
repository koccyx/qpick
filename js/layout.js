const $optionMenu = document.querySelector('.header__menu');
const $selectBtn = $optionMenu.querySelector('.menu__btn');
const $selectBtnText = $selectBtn.querySelector('.btn__text'); 
const $options = $optionMenu.querySelector('.menu__options');
const $chevron = $selectBtn.querySelector('.menu__btn__chevron');
const $burgerMenu = document.querySelector('.header__burger');

function menu_replacer() {
    if (window.innerWidth < 700) {
        document.querySelector('.mobile__item__container').prepend($optionMenu);
    } else {
        document.querySelector('.header__left').append($optionMenu);
    }
};

function chavronToggle() {
    if ($chevron.classList.contains('fa-chevron-down')) {
        $chevron.classList.remove('fa-chevron-down');
        $chevron.classList.add('fa-chevron-up');
    } else {
        $chevron.classList.remove('fa-chevron-up');
        $chevron.classList.add('fa-chevron-down');
    }
}


$options.addEventListener('click', e => {
    if(!e.target.closest('.menu__option')) return;
    
    const $option = e.target.closest('.menu__option');
    $selectBtnText.innerText = $option.innerText;
    document.querySelector('.words-model').innerText = $option.innerText;
    console.log('butn');
}); 


document.addEventListener('click', e => {
    if(e.target.closest('.header__menu')) {
        $options.classList.toggle('inactive');
        chavronToggle();
    } else {
        $options.classList.add('inactive');
        $chevron.classList.remove('fa-chevron-up');
        $chevron.classList.add('fa-chevron-down');
    }
});


$burgerMenu.addEventListener('click', () => {
    document.querySelector('.header__mobile__menu').classList.toggle('active');
    console.log(document.body.style.overflow);
    document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden';
});

document.addEventListener('DOMContentLoaded',menu_replacer);
window.addEventListener('resize', menu_replacer);

