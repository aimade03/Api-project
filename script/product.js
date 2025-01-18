const cards = document.querySelector(".cards");
let search = document.querySelector("#search")

let products = [];
let cart =JSON.parse(localStorage.getItem('cart')) ||[];

function fetchProducts() {
    return fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            products = data;
            productsRender(products)
        });
}
function productsRender(products){
    cards.innerHTML = "" ;
    products.forEach(item => {
        let div = document.createElement("div")
        div.classList = "product-card"
        let img = document.createElement("img")
        img.setAttribute("src", item.image)
        img.style.height = "300px"
        img.classList = "product-image"
        let h2 = document.createElement("h2")
        h2.classList = "product-title"
        let title = item.title;
        if (title.length > 30) {
            title = title.substring(0, 30) + "...";
        }
        h2.style.height = "50px"
        h2.innerHTML = title
        let p = document.createElement("p")
        p.innerHTML = item.price
        p.classList = "product-price"
        let button = document.createElement("button")
        button.innerHTML = "Add To Cart"
        button.classList = "add-to-cart"
        button.addEventListener("click",() => {
             AddCart(item)
        }
    )
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(button)
        cards.appendChild(div)
    })
}
function filterProducts(){
    const searchValue = search.value.toLowerCase()
    const filtered = products.filter(item => item.title.toLowerCase().includes(searchValue))
    productsRender(filtered)
}
search.addEventListener("input", filterProducts);
fetchProducts()