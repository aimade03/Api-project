


document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items')
    let product = JSON.parse(localStorage.getItem('cart')) || [];
    

    function productsRender(product) {
        items.innerHTML = '';
        product.forEach((cart ,index) => {
            let cartItem = document.createElement('div');
            cartItem.classList = "cart-item";
    
            let image = document.createElement('img');
            image.setAttribute('src', cart.image);
    
            let itemDetails = document.createElement('div');
            itemDetails.classList = "item-details";
            let h3 = document.createElement("h3");
            h3.innerHTML = cart.title;
            let p = document.createElement("p");
            p.innerHTML = cart.category;
                
            let removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList = "btn btn-outline-danger"
            removeButton.addEventListener('click', () => {
                product.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(product));
                productsRender(product);
                calculateTotal();
                updateCartIcon();
            });

    
            itemDetails.appendChild(h3);
            itemDetails.appendChild(p);
            itemDetails.appendChild(removeButton)
    
            let itemPrice = document.createElement('div');
            itemPrice.classList = "item-price";
            itemPrice.innerHTML = `$${cart.price.toFixed(2)}`;
    
            cartItem.appendChild(image);
            cartItem.appendChild(itemDetails);
            cartItem.appendChild(itemPrice);
            items.appendChild(cartItem);
        });
    }
    function calculateTotal(){
        let total = 0
        product.forEach( item => 
            total += item.price
        )

        let divTotal = document.querySelector(".total")
        divTotal.innerHTML = ` Total : ${total.toFixed(0)}  `
    }
    
productsRender(product)
calculateTotal()        
})