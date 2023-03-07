/* ------------ JavaScript des produits ------------ */

// Viens récupérer l'URL du navigateur
const urlSearchParams = new URLSearchParams(window.location.search);

// Fonction qui viens récupérer les infos produits correspondant à l'id
// et qui va les intégrer à la page produit
fetch(`http://localhost:3000/api/products/${urlSearchParams.get('id')}`)

    .then((response) => response.json())

    .then(canap => {

        document.querySelector('.item__img').innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`

        document.getElementById('title').innerHTML = canap.name
        document.getElementById('price').innerHTML = canap.price
        document.getElementById('description').innerHTML = canap.description

        document.getElementById("colors").innerHTML = canap.colors.map( color => `<option value="${color}">-- ${color} --</option>` ).join('')
    })

// Viens récupérer le bouton ajouter au panier
const panier = document.querySelector('#addToCart')

// Fonction qui s'active au click du bouton ajouter au panier
// et qui va stocker la selection dans le localStorage
panier.addEventListener('click', () => {

    // Récupération des informations sélectionné
    let id = urlSearchParams.get('id')
    let color = document.querySelector('#colors').value
    let nber = parseInt(document.querySelector('#quantity').value)

    // Création de l'objet avec les informations
    let choixCanap = {id,color,nber}

    // Récupération des infos du localStorage
    let cart = localStorage.getItem('choix-canap')
    if (cart === null) {   
        cart = []   
    }
    else {
        cart = JSON.parse(cart)
    }

    // Vérification du produit séléctionné et modification du panier
    let index = cart.findIndex((product) => product.color ===  color && product.id === id)
    if (index >= 0) {
        cart[index].nber += nber
    }
    else {
        cart.push(choixCanap)
    }

    // Ajout dans le localStorage
    cart = JSON.stringify(cart)
    localStorage.setItem('choix-canap',cart)
})