const openModal = document.querySelector('.confirm__button');
const closeModal = document.querySelector('.modal__button');
const modal = document.querySelector('#modal');

console.log(modal);
openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
    localStorage.removeItem('cart');
})