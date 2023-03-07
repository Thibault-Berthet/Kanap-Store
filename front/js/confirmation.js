/* ------------- JS de la confirmation de commande ------------- */

// Récupération du numéro de commande et affichage sur la page
const orderId = new URL(window.location.href).searchParams.get("id")
document.querySelector('#orderId').innerHTML = orderId