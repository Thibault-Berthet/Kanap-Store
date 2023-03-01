/* ------------ Commentaires et tentatives de code ------------ */

// Variable en camelCase
// Class en PascalCase

// Window c'est toute ma fenetre navigateur
// Window.location c'est la barre de recherche
// Window.location.search c'est l'entierete de l'URL

// const params = Object.fromEntries(urlSearchParams.entries()); ==> Alternative à urlSearchParams.get("id") en remplaçant tout ça par une constante params
// console.log(params.id);

// ------ Boucle pour la selection des couleurs ------
// let options = "";
        // for (let i = 0; i < canap.colors.length; i++){
        //     // document.getElementById("colors").innerHTML = 
        //     // += garde la valeur précédente et ajoute la suivante dedans
        //     options += `<option value="${canap.colors[i]}">-- ${canap.colors[i]} --</option>`;
        // }

// ------ Tentative pour récupérer les elements et les stocker dans le localStorage ------
    // let objCanap = [`${urlSearchParams.get('id')}`, document.getElementsByClassName('color-select'), document.getElementsByClassName('itemQuantity')]
    // let donneeCanap = JSON.stringify(objCanap)

    // for (let i = 0; i < choixCanapUnStringi.length; i+= 3) {
        //     if ( (choixCanapUnStringi[i] === choixCanap[i]) && (choixCanapUnStringi[i+1] === choixCanap[i+1]) ) {
        //         choixCanapUnStringi[i+2].value += choixCanap[i+2]
        //     }
        //     else{
        //         choixCanapUnStringi = choixCanapUnStringi.concat(choixCanap)
        //         break
        //     }
        // }
    // récuperation avec un tableau uniquement et non un tableau d'objet

/* ------------ JavaScript des produits ------------ */

const urlSearchParams = new URLSearchParams(window.location.search);
// URLSearchParams est fourni par JS

fetch(`http://localhost:3000/api/products/${urlSearchParams.get('id')}`)

    .then((response) => response.json())

    .then(canap => {

        document.querySelector('.item__img').innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`;

        document.getElementById('title').innerHTML = canap.name;
        document.getElementById('price').innerHTML = canap.price;
        document.getElementById('description').innerHTML = canap.description;

        document.getElementById("colors").innerHTML = canap.colors.map( color => `<option value="${color}">-- ${color} --</option>` ).join('');
        // Fait la meme chose que la boucle for
    })


const panier = document.querySelector('#addToCart')

panier.addEventListener('click', () => {

    let id = urlSearchParams.get('id')

    let color = document.querySelector('#colors').value

    let nber = parseInt(document.querySelector('#quantity').value)

    let choixCanap = {id,color,nber}
    // Tableau des choix qui vont aller dans le panier
    // Si les clés ont le meme nom que la variable pas besoin de les déclaré
    let cart = localStorage.getItem('choix-canap')

    // console.log(choixCanap)

    if (cart === null) {   
        cart = []   
    }
    else {
        cart = JSON.parse(cart)
    }
    // console.log(cart.length)

    let index = cart.findIndex((product) => product.color ===  color && product.id === id)

    // console.log(index)

    if (index >= 0) {
        cart[index].nber += nber
    }
    else {
        cart.push(choixCanap)
    }
    // console.log(cart)

    cart = JSON.stringify(cart)
    localStorage.setItem('choix-canap',cart)
})