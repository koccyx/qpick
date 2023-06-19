document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!e.target.closest('.item-button')) return;
    productParser(e.target.closest('.item-button'));
})

function productParser($btn) {
    const elem = $btn.closest('.shop__item');
    const elemObject = {
        'img' : elem.querySelector('.item-img').getAttribute('src'),
        'label' : elem.querySelector('.words__product').innerText,
        'price' : elem.querySelector('.words__price').innerText,
        'amount' : 1
    };
   
    const productsArr = JSON.parse(localStorage.getItem('cart'));
    if (!productsArr.length) {
        productsArr.push(elemObject);
    } else {
        let flag = true;
        for(let item of productsArr) {
            if (item.label == elemObject.label) {
                console.log(item.price)
                item.amount = + item.amount + 1; 
                flag = false;
            };

        }
        if(flag) {
            productsArr.push(elemObject);
        }
    }

    console.log(productsArr);
    localStorage.setItem('cart',JSON.stringify(productsArr));
}

document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}) 
