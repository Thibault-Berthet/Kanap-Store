/* ------------ JavaScript du panier ------------ */

// Fonction d'affichage des différents élements du panier
async function displayCart() {

    // Récupération des infos du localStorage
    let cart = localStorage.getItem('choix-canap')
    if (cart === null) {   
        cart = []   
    }
    else{
        cart = JSON.parse(cart)
    }

    // Variables de la page
    let html = ''
    let totalArticle = 0
    let totalPrice = 0

    // Boucle qui va parcourir le panier et créer les élements qui seront afficher
    // qui sont les produits, le prix total et la quantité total d'article
    for ( let i = 0; i < cart.length; i++ ){
        const product = cart[i]
        const canap = await getProductById(product.id)
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
                    <p>${canap.price} €</p>
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

    // Affichage des élements crées precedement
    document.querySelector('#cart__items').innerHTML = html
    document.querySelector('#totalQuantity').innerHTML = totalArticle
    document.querySelector('#totalPrice').innerHTML = totalPrice

    // Fonctions qui permettent de modifier le panier
    suppItem()
    changeQuantity()
}

// Fonction de récuperation de l'id du produit
async function getProductById(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
      .then(function (response) {
        return response.json();
      })
}

// Fonction de suppression d'un élément du panier
function suppItem () {

    // Viens récupérer le bouton supprimer
    const buttons = document.querySelectorAll('.deleteItem')

    // Evenement au click de n'importe quelle bouton supprimer
    buttons.forEach((button) => {
        button.addEventListener('click', () => {

            // Viens se placer au niveau de l'article à supprimer
            // et renvoi l'index de celui ci
            const article = button.closest('.cart__item')
            const {id, color} = article.dataset
            let cart = localStorage.getItem('choix-canap')
            if (cart === null) {   
                cart = []   
            }
            else {
                cart = JSON.parse(cart)
            }
            let index = cart.findIndex((product) => product.color ===  color && product.id === id)

            // Supprime l'article
            cart.splice(index, 1)

            // Met à jour le localStorage
            cart = JSON.stringify(cart)
            localStorage.setItem('choix-canap',cart)
            displayCart()
        })
    })
}

// Fonction de modification du nombre d'un des éléments du panier
function changeQuantity () {

    // Viens récupérer le changement de quantité
    const quantitySettings = document.querySelectorAll('.itemQuantity')

    // Evenement au changement de la quantité
    quantitySettings.forEach((settings) => {
        settings.addEventListener('change', (event) => {

            // Récupère la valeur, viens se placer au niveau de l'article à modifier
            // et renvoi l'index de celui-ci
            const inputValue = event.target.value
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

            // Modifie le nombre d'article
            cart[index].nber = parseInt(inputValue)

            // Met à jour le localStorage
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
    
    // Désactive le comportement par défaut du navigateur
    event.preventDefault()

    // Récupère les informations entrées dans les formulaires
    const contact = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
    }

    // Vérification des informations des formulaires, stockage dans le localStorage
    // et envoie vers le serveur si ok
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

/* ------------ Vérifications des différents formulaires avec les regex ------------ */
/**
 * Vérification du prénom
 * @param {string} firstName 
 * @returns {boolean}
 */
function firstName (firstName) {
    if (firstName.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\-]+$/)) {
        document.querySelector('#firstNameErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#firstNameErrorMsg').textContent = "Le format du prénom n'est pas bon, veuillez corriger svp, ex : Jérôme"
        return false
}

/**
 * Vérification du nom de famille
 * @param {string} lastName 
 * @returns {boolean}
 */
function lastName (lastName) {
    if (lastName.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#lastNameErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#lastNameErrorMsg').textContent = "Le format du nom de famille n'est pas bon, veuillez corriger svp, ex : De Labarre"
        return false
}

/**
 * Vérification de l'adresse
 * @param {string} address 
 * @returns {boolean}
 */
function address (address) {
    if (address.match(/^[A-Za-z0-9\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#addressErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#addressErrorMsg').textContent = "Le format de l'adresse n'est pas bon, veuillez corriger svp, ex : 3 Impasse des Cerisiers"
        return false
}

/**
 * Vérification de la ville
 * @param {string} city 
 * @returns {boolean}
 */
function city (city) {
    if (city.match(/^[A-Z][A-Za-z\ç\é\è\ê\î\ï\ô\ù\s\'\-]+$/)) {
        document.querySelector('#cityErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#cityErrorMsg').textContent = "Le format de la ville n'est pas bon, veuillez corriger svp, ex : Grenoble"
        return false
}

/**
 * Vérification du mail
 * @param {string} email 
 * @returns {boolean}
 */
function email (email) {
    if (email.match(/^[_a-z0-9-.]+@[a-z0-9-]+.[a-z0-9-]+$/)) {
        document.querySelector('#emailErrorMsg').textContent = ''
        return true
    }
        document.querySelector('#emailErrorMsg').textContent = "Le format du mail n'est pas bon, veuillez corriger svp, ex : jerome.de-labarre@gmail.com"
        return false
}

/**
 * Fonction d'envoie vers le serveur
 * @param {object} contact 
 * @param {Array} products 
 */
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
        if (orderId) {
            location.href = "confirmation.html?id=" + orderId
        }
    })
}