/* ------------ JavaScript du panier ------------ */

        // fetch(`http://localhost:3000/api/products/${product.id}`)
        // .then((response) => response.json())    
        // .then(canap => { 
        //     totalArticle += product.nber
        //     return totalArticle
        // })
        // .then((totalArticle => document.querySelector('#totalQuantity').innerHTML = totalArticle))


        // fetch(`http://localhost:3000/api/products/${product.id}`)
        // .then((response) => response.json())    
        // .then(canap => { 
        //     totalPrice += canap.price * product.nber
        //     return totalPrice
        // })
        // .then((totalPrice => document.querySelector('#totalPrice').innerHTML = totalPrice))

async function displayCart() {

    let cart = localStorage.getItem('choix-canap')

    if (cart === null) {   
        cart = []   
    }
    else{
        cart = JSON.parse(cart)
    }

    let html = ''
    let totalArticle = 0
    let totalPrice = 0

    for ( let i = 0; i < cart.length; i++ ){

        const product = cart[i]

        const canap = await getProductById(product.id)
        // const canap = await fetch(`http://localhost:3000/api/products/${product.id}`)
        // .then(function (response) {
        //     return response.json();
        // })
        totalPrice += canap.price * product.nber
        totalArticle += product.nber
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
        </article>`

    }
    document.querySelector('#cart__items').innerHTML = html
    document.querySelector('#totalQuantity').innerHTML = totalArticle
    document.querySelector('#totalPrice').innerHTML = totalPrice
    suppItem()
    changeQuantity()
}

// Récuperation de l'id du produit
async function getProductById(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
      .then(function (response) {
        return response.json();
      })
}

// Suppression d'un element du panier
function suppItem () {
    const buttons = document.querySelectorAll('.deleteItem')
    // const test = supp.closest('data-id')
    // console.log(buttons)
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const article = button.closest('.cart__item')
            const {id, color} = article.dataset
            // <article data-product-id=“tonid”>
            // article.dataset.productId
            let cart = localStorage.getItem('choix-canap')
            // console.log(article)
            if (cart === null) {   
                cart = []   
            }
            else {
                cart = JSON.parse(cart)
            }
            // console.log(cart.length)
            let index = cart.findIndex((product) => product.color ===  color && product.id === id)

            // console.log(index)

            cart.splice(index, 1)

            // console.log(cart.length)
            // console.log(cart)

            cart = JSON.stringify(cart)
            localStorage.setItem('choix-canap',cart)

            displayCart()
        })
    })
}

// Modification du nombre d'un des elements du panier
function changeQuantity () {
    const quantitySettings = document.querySelectorAll('.itemQuantity')

    quantitySettings.forEach((settings) => {
        settings.addEventListener('change', (event) => {

            const inputValue = event.target.value
            // console.log(inputValue)

            const article = settings.closest('.cart__item')
            const {id, color} = article.dataset
            let cart = localStorage.getItem('choix-canap')
            if (cart === null) {   
                cart = []   
            }
            else {
                cart = JSON.parse(cart)
            }
            let index = cart.findIndex((product) => product.color ===  color && product.id === id)

            // const quantity = cart[index].nber
            // console.log(quantity)

            cart[index].nber = parseInt(inputValue)

            cart = JSON.stringify(cart)
            localStorage.setItem('choix-canap',cart)

            displayCart()
        })  
    })
}

displayCart()

// Recuperation des informations du contact
const validate = document.querySelector('#order')

validate.addEventListener('click', (event) => {
    event.preventDefault()
    // Désactive le comportement par défaut du navigateur

    const contact = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
    }
    // console.log(contact)
    if (firstName(contact.firstName) && lastName(contact.lastName) && address(contact.address) && city(contact.city) && email(contact.email)) {
        contactInfos = JSON.stringify(contact)
        localStorage.setItem('contact', contactInfos)

        const cart = JSON.parse(localStorage.getItem('choix-canap'))
        sendToServer(contact, cart.map(product => product.id))
    }
    else {
        alert("Le formulaire de contact comporte des erreurs de format, veuillez corriger svp")
    }
})

// Vérification des données entrées dans les formulaires

// Vérification du prénom
function firstName (firstName) {
    // const firstN = contact.firstName
    if (firstName.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\-]+$/)) {
        document.querySelector('#firstNameErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#firstNameErrorMsg').textContent = "Le format du prénom n'est pas bon, veuillez corriger svp, ex : Jérôme"
        return false
}

// Vérification du nom de famille
function lastName (lastName) {
    // const lastN = contact.lastName
    if (lastName.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#lastNameErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#lastNameErrorMsg').textContent = "Le format du nom de famille n'est pas bon, veuillez corriger svp, ex : De Labarre"
        return false
}

// Vérification de l'adresse
function address (address) {
    // const addressN = contact.address
    if (address.match(/^[A-Za-z0-9\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#addressErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#addressErrorMsg').textContent = "Le format de l'adresse n'est pas bon, veuillez corriger svp, ex : 3 Impasse des Cerisiers"
        return false
}

// Vérification de la ville
function city (city) {
    // const cityN = contact.city
    if (city.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#cityErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#cityErrorMsg').textContent = "Le format de la ville n'est pas bon, veuillez corriger svp, ex : Grenoble"
        return false
}

// Vérification du mail
function email (email) {
    // const emailN = contact.email
    if (email.match(/^[_a-z0-9-.]+@[a-z0-9-]+.[a-z0-9-]+$/)) {
        document.querySelector('#emailErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#emailErrorMsg').textContent = "Le format du mail n'est pas bon, veuillez corriger svp, ex : jerome.de-labarre@gmail.com"
        return false
}

// Envoie vers le serveur
function sendToServer (contact, products) {
    fetch('http://localhost:3000/api/products/order', {
        method : 'POST',
        body: JSON.stringify({contact, products}),
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then((response) => {
        return response.json()
    })
    .then(({orderId}) => {
        // const {orderId} = server // Similaire à la ligne d'au dessus, on dit déstructurer un objet
        if (orderId) {
            // console.log(orderId)
            location.href = "confirmation.html?id=" + orderId
        }
    })
}

// Récuperer les infos des formulaires
// Stock dans un objet avec les bon noms (voir spec techniques)
// Recup avec queery selector.value
// Verifie si y'a pas d'erreur
// Envoie un objet contact et un tableau qui s'apelle cart et qui renvoie un tableau d'id (tableau à manipuler pour envoie uniquement des ID)
// cart.map(product => product.id)
// Reception du numéro de commande, et le passer dans l'url