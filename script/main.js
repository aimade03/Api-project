
function AddCart(produit){
    let cartAlready = cart.some(item => item.title === produit.title);
    if (cartAlready) { 
    alert("This product is already in the cart!");
    return; 
    }

    cart.push(produit);
    localStorage.setItem('cart',JSON.stringify(cart));
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
let user_active = JSON.parse(localStorage.getItem('user_active')) || null
let button = document.querySelector('#btn')
let buttonRegester = document.querySelector('#btnR')
if(!user_active){
    button.classList.remove('disabled')
    buttonRegester.classList.remove('disabled')
    
}


