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


const boutonPanier = document.querySelector('#addToCart')
console.log(boutonPanier)

boutonPanier.addEventListener('click', () => {
    console.log('test-du-click')
    // localStorage.clear()

    let idCanap = urlSearchParams.get('id')
    console.log(idCanap)

    let colorCanap = document.querySelector('#colors').value
    console.log(colorCanap)

    let nberCanap = document.querySelector('#quantity').value
    console.log(nberCanap)

    localStorage.setItem('id-Canap',idCanap)
    localStorage.setItem('color-Canap',colorCanap)
    localStorage.setItem('nber-Canap',nberCanap)
})