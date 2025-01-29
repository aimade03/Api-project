document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (orderId) {
        const orderData = JSON.parse(localStorage.getItem('lastOrder'));
        
        if (orderData && orderData.id == orderId) {

            document.querySelector('#order-id').textContent = orderData.id;
            document.querySelector('#order-date').textContent = new Date(orderData.date).toLocaleString();
            document.querySelector('#order-total').textContent = orderData.total.toFixed(2);
        } else {
            alert('Order not found!');
            window.location.href = 'index.html';
        }
    } else {
        alert('Invalid order ID!');
        window.location.href = 'index.html';
    }
});