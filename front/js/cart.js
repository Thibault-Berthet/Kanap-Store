/* ------------ JavaScript du panier ------------ */

let cart = localStorage.getItem('choix-canap')

if (cart === null) {   
    cart = []   
}
else{
    cart = JSON.parse(cart)
}

let html = ''

for ( let i= 0; i < cart.length; i++ ){

    const product = cart[i]

    fetch(`http://localhost:3000/api/products/${product.id}`)

    .then((response) => response.json())

    .then(canap => {
        console.log(canap)
        html += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${canap.imageUrl}" alt="${canap.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${canap.name}</h2>
                        <p>${product.color}</p>
                    <p>${canap.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.nber}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
    `
    })
}

console.log(html)

document.querySelector('#cart__items').innerHTML = html