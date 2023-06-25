const productsArr = JSON.parse(localStorage.getItem('cart')); 
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

function cartIsEmpty() {
    if (!productsArr.length) {
        document.querySelector('.cart-empty').classList.remove('off');
        document.querySelector('.cart-inner').classList.add('off');
    }
}

function findInLocalStorage($item) {
    for (let elem of productsArr) {
        if (elem.label === $item.querySelector('.item__words').innerText) {
            return elem;
        }
    }
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(productsArr));
}

function confirmPriceUpdater() {
    let confirmPrice = 0;
    for (let item of productsArr) {
        confirmPrice += parseInt(item.price) * +item.amount;
    }
    document.querySelector('.confirm-price').innerText = confirmPrice + '₽';
}

//1

////////////////
function totalPriceUpdater($item) {
    $totalPrice = $item.querySelector('.total__price');
    let currentProduct = findInLocalStorage($item);
    $totalPrice.innerText = currentProduct.amount * parseInt(currentProduct.price) + '₽';
}
///////////////




function cartRemover($element) {
    let elemLabel = $element.querySelector('.item__words').innerText;
    for (let i = 0; i < productsArr.length; i++) {
        if (elemLabel == productsArr[i].label) {
            productsArr.splice(i, 1);
            updateLocalStorage();
            document.querySelector('.cart__container').removeChild($element);
            cartIsEmpty()
            updateLocalStorage();
            console.log(localStorage.getItem('cart'));
            return;
        }
    }
}



document.querySelector('.carts').addEventListener('click', (e) => {
    if (!e.target.closest('.imgDelete')) return;
    
    let $elem = e.target.closest('.cart-item');
    
    cartRemover($elem);
    confirmPriceUpdater();
});

//1

// price


document.querySelector('.cart__container').addEventListener('click', (e) => {
    let $btn = e.target.closest('.item__button');
    if (!$btn) return;

    let $item = $btn.closest('.cart-item');
    let item = findInLocalStorage($item);

    if ([...$btn.classList].includes('item___button-left') && item.amount >= 1) {
        item.amount -= 1;
    } else if ([...$btn.classList].includes('item___button-left') && +item.amount === 1) {
        cartRemover($item);
    } else {
        item.amount += 1;
    }
    $item.querySelector('.item-amount').innerText = item.amount;

    updateLocalStorage();
    confirmPriceUpdater();
    totalPriceUpdater($item);
    console.log(item.amount);
})  



document.addEventListener('DOMContentLoaded', () => {
    cartIsEmpty();
    cartLoader();
    confirmPriceUpdater();
});



