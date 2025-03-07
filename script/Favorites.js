
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites)

    function productsRender(product) {
        container.innerHTML = '';
        favorites.forEach((fav) => {
            let favItem = document.createElement('div');
            favItem.classList = "fav-item";

            let image = document.createElement('img');
            image.classList = "fav-image"
            image.setAttribute('src', fav.image);

            let itemDetails = document.createElement('div');
            itemDetails.classList = "item-details";
            let h3 = document.createElement("h3");
            h3.classList = "fav-title"
            h3.innerHTML = fav.title;
            let p = document.createElement("p");
            p.innerHTML = fav.category;

            let removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList = "btn-remove"
            removeButton.addEventListener('click', () => {
                removeFavorites(fav)
                productsRender(product);
            });


            itemDetails.appendChild(h3);
            itemDetails.appendChild(p);
            itemDetails.appendChild(removeButton)

            let itemPrice = document.createElement('div');
            itemPrice.classList = "fav-price";
            itemPrice.innerHTML = `$${fav.price.toFixed(2)}`;

            favItem.appendChild(image);
            favItem.appendChild(itemDetails);
            favItem.appendChild(itemPrice);
            container.appendChild(favItem);
        });
    }
    productsRender()
})

