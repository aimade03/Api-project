
const cards = document.querySelector(".cards");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log(productId);

let products = JSON.parse(localStorage.getItem('products')) || [];
console.log(products);

let product = products.find(item => item.id == productId);
console.log(product);

function showProductRender(product) {
    let div = document.createElement("div");
    div.classList = "product-card";

    let img = document.createElement("img");
    img.setAttribute("src", product.image);
    img.style.height = "300px";
    img.classList = "product-image";

    let h2 = document.createElement("h2");
    h2.classList = "product-title";
    h2.style.height = "50px";
    h2.innerHTML = product.title;

    let p = document.createElement("p");
    p.classList = "product-price";
    p.innerHTML = product.price;

    let pd = document.createElement('p');
    pd.classList = "product-description";
    pd.innerHTML = product.description;

    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.classList = "quantity-input";

    let button = document.createElement("button");
    button.innerHTML = "Add To Cart";
    button.classList = "add-to-cart";
    button.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            addToCart(product, quantity);
        } else {
            alert("Please enter a valid quantity!");
        }
    });

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(pd);
    div.appendChild(quantityInput);
    div.appendChild(button);
    cards.appendChild(div);
}

if (product) {
    showProductRender(product);
} else {
    cards.innerHTML = "Product not found.";
}

function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id == product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        product.quantity = quantity;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let icon = document.querySelector(".cart-icn");

    if (cart.length === 0) {
        icon.style.display = "none";
    } else {
        icon.style.display = "inline";
        icon.textContent = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', updateCartIcon);