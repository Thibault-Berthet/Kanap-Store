/* ------------ JavaScript des produits ------------ */

const urlSearchParams = new URLSearchParams(window.location.search);
// URLSearchParams est fourni par JS
// Variable en camelCase
// Class en PascalCase
// Window c'est toute ma fenetre navigateur
// Window.location c'est la barre de recherche
// Window.location.search c'est l'entierete de l'URL

// console.log(urlSearchParams.get("id"));

// const params = Object.fromEntries(urlSearchParams.entries()); ==> Alternative à urlSearchParams.get("id") en remplaçant tout ça par une constante params

// console.log(params.id);

// Requete à l'adresse indiqué dans le fetch
fetch(`http://localhost:3000/api/products/${urlSearchParams.get("id")}`)

// Attend la réponse du JSON ? Le response correspond à une réponse ?
    .then((response) => response.json())

    .then(canap => {
        document.getElementById("title").innerHTML = canap.name
    })