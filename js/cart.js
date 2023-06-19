const productsArr = JSON.parse(localStorage.getItem('cart')); 

function cartIsEmpty() {
    if (!productsArr.length) {
        document.querySelector('.cart-empty').classList.remove('off');
        document.querySelector('.cart-inner').classList.add('off');
    }
}

function cartLoader() {
    productsArr.forEach(elem => {
        let $cart = document.querySelector('.cart__container');

        $cart.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <div class="item__left">
                    <img src="${elem.img}" alt="item" class="item__img">
                    <div class="item__buttons">
                        <button class="item__button item___button-left">-</button>
                        <b class="item-amount">${elem.amount}</b>
                        <button class="item__button item___button-right">+</button>
                    </div>
                </div>
                <div class="item__center">
                    <h3 class="item__words">${elem.label}</h3>
                    <h4 class="item__price">${elem.price}</h4>
                </div>
                <div class="item__right">
                    <img src="img/Vector.svg" alt="deleter" class="imgDelete">
                    <h4 class="total__price">${+elem.amount * parseInt(elem.price) + '₽'}</h4>
                </div>
            </div>
        `)
    });   
}

document.querySelector('.carts').addEventListener('click', (e) => {
    if (!e.target.closest('.imgDelete')) return;

    let $elem = e.target.parentElement.parentElement;
    let elemLabel = $elem.querySelector('.item__words').innerText;
    
    for (let i = 0; i < productsArr.length; i++) {
        if (elemLabel == productsArr[i].label) {
            productsArr.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(productsArr));
            document.querySelector('.cart__container').removeChild($elem);
            cartIsEmpty()
            console.log(localStorage.getItem('cart'));
            return;
        }
    }
});

document.addEventListener('DOMContentLoaded', cartLoader);

document.addEventListener('DOMContentLoaded', cartIsEmpty);