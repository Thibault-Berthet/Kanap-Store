/* JavaScript de l'index */

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(data => data.map(canap => `
        <a href="./product.html?id=42">
            <article>
                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">${canap.name}</h3>
                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
        </a>
    `))
    .then(html => document.getElementById("items").innerHTML = html.join(''));


