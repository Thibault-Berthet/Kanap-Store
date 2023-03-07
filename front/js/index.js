/* ------------ JavaScript de l'index ------------ */

// Fonction qui va aller chercher les informations produits de l'API
// et les intégrer dans la page d'accueil
fetch("http://localhost:3000/api/products")

    .then((response) => response.json())
    // return le tableau data[]
    
    .then(data => data.map(canap =>                                             
    `                                           
        <a href="./product.html?id=${canap._id}">                                         
            <article>
                <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                <h3 class="productName">${canap.name}</h3>
                <p class="productDescription">${canap.description}</p>
            </article>
        </a>
    `
    ))
    // return le tableau html[]
    
    .then(html => document.getElementById("items").innerHTML = html.join(''))
    // Génère le HTML au niveau de l'id items