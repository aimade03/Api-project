document.addEventListener('DOMContentLoaded', () => {
    const divCart = document.querySelector('#cart-items');
    const totalElement = document.querySelector('#total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems(cart) {
        divCart.innerHTML = '';
        let total = 0;
        
        cart.forEach((item) => {
            const ul = document.createElement('ul');
            ul.className = 'ul-list';

            const li = document.createElement('li');
            li.className = 'li-item';

            const img = document.createElement('img');
            img.className = 'image';
            img.src = item.image;
            img.alt = item.title;


            const title = document.createElement('h3');
            title.className = 'title';
            title.textContent = item.title;

            const quantity = document.createElement('p');
            quantity.textContent = `Quantity: ${item.quantity}`;

            const price = document.createElement('p');
            price.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;


            li.appendChild(img);
            li.appendChild(title);
            li.appendChild(quantity);
            li.appendChild(price);
            
            ul.appendChild(li);
            divCart.appendChild(ul);

            total += item.price * item.quantity;
        });

        totalElement.textContent = total.toFixed(2);
    }


    async function processPayment(paymentData) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            return Math.random() > 0.5 ? 
                { status: 'success', transactionId: Date.now() } : 
                { status: 'failed', error: 'Payment declined' };
            
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    }
    document.querySelector('.checkout-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const cardNumber = document.querySelector('#card').value;
        const cvv = document.querySelector('#cvv').value;

        if (!cardNumber || !cvv) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const paymentData = {
                cardNumber: cardNumber.replace(/\s/g, ''),
                amount: parseFloat(totalElement.textContent)
            };

            const result = await processPayment(paymentData);

            if (result.status === 'success') {

                const order = {
                    id: Date.now(),
                    items: cart,
                    total: paymentData.amount,
                    date: new Date().toISOString()
                };
                
                localStorage.setItem('lastOrder', JSON.stringify(order));
                localStorage.removeItem('cart');
                
                window.location.href = `confirmation.html?orderId=${order.id}`;
            } else {
                alert(`Payment failed: ${result.error}`);
            }
            
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    });

    renderCartItems(cart);
});
