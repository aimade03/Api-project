const cards = document.querySelector(".cards");
let search = document.querySelector("#search")

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

function fetchProducts() {
    return fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            products = data;
            localStorage.setItem("products", JSON.stringify(products));
            productsRender(products);
        });
}
function productsRender(products) {
    cards.innerHTML = "";
    products.forEach(item => {
        let div = document.createElement("div")
        div.classList = "product-card"

        let img = document.createElement("img")
        img.setAttribute("src", item.image)
        img.style.height = "300px"
        img.classList = "product-image"
        img.addEventListener("click", () => {
            window.location.href = `showproduct.html?id=${item.id}`
        })
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
        button.addEventListener("click", () => {
            AddCart(item, 1)
        }
        )
        let buttonFav = document.createElement('span')
        buttonFav.innerHTML = `<i class="fa-solid fa-heart"></i>`
        buttonFav.classList = "add-to-fav"
        buttonFav.addEventListener("click",() => {
            AddFavorites(item)
        })
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(buttonFav)
        cards.appendChild(div)
    })
}
function searchProducts() {
    const searchValue = search.value.toLowerCase()
    const filtered = products.filter(item => item.title.toLowerCase().includes(searchValue))
    productsRender(filtered)
}
const divFilter = document.querySelector("#filterForm")
divFilter.addEventListener("submit", (e) => {
    e.preventDefault()
    function filterProduit() {
        let minprice = document.querySelector("#minPrice").value
        let maxprice = document.querySelector("#maxPrice").value
        let category = document.querySelector("#category").value

        if (isNaN(minprice) || minprice === "") minprice = 0;
        if (isNaN(maxprice) || maxprice === "") maxprice = Infinity;

        const filtered = products.filter(produit => {
            const matchPrice = produit.price >= minprice && produit.price <= maxprice;
            const matchCategory = category === "" || produit.category === category;
            return matchPrice && matchCategory;
        });
        productsRender(filtered)
    }
    filterProduit()
})


search.addEventListener("input", searchProducts);
fetchProducts()
