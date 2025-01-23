
function AddCart(produit, quantity) {
    // let cartAlready = cart.some(item => item.title === produit.title);
    // if (cartAlready) { 
    // alert("This product is already in the cart!");
    // return; 
    // }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let ifExistingProduct = cart.find(item => item.title == produit.title)
    if (ifExistingProduct) {
        ifExistingProduct.quantity += quantity
    } else {
        produit.quantity = quantity
        cart.push(produit);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
    console.log(produit)



    function updateCartIcon() {
        let icon = document.querySelector(".cart-icn");
        if (cart.length === 0) {
            icon.style.display = "none";
        } else {
            icon.style.display = "inline";
            icon.textContent = cart.length;
        }
    }
    updateCartIcon();

}
document.addEventListener('DOMContentLoaded', () => {
    let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cartFromStorage;
    let icon = document.querySelector(".cart-icn");
    if (cart.length === 0) {
        icon.style.display = "none";
    } else {
        icon.style.display = "inline";
        icon.textContent = cart.length;
    }
});

function AddFavorites(produit){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [] ;
    let ifExistingFavorites = favorites.find(item => item.title === produit.title)

    if(ifExistingFavorites){
        alert(' this is product aleardy Add in favorites ')
    } else {
        favorites.push(produit)
        localStorage.setItem('favorites' , JSON.stringify(favorites))
    }
}

function removeFavorites(produit){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [] ;
    let removeFavorites = favorites.filter( item => item.title !== produit.title)
    localStorage.setItem("favorites",JSON.stringify(removeFavorites))
}

let user_active = JSON.parse(localStorage.getItem('user_active')) || null
let button = document.querySelector('#btn')
let buttonRegester = document.querySelector('#btnR')
if (!user_active) {
    button.classList.remove('disabled')
    buttonRegester.classList.remove('disabled')

}


