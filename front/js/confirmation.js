/* ------------- JS de la confirmation de commande ------------- */

const orderId = new URL(window.location.href).searchParams.get("id")

console.log(orderId)

document.querySelector('#orderId').innerHTML = orderId