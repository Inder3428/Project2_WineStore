// Shopping cart functionality
let cart = [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${item.productName} - $${item.price.toFixed(2)}
            <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });
    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }

    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'block';
}

function closeModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'none';
}

function submitOrder() {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const email = document.getElementById('customer-email').value;
    const cardNumber = document.getElementById('payment-card').value;
    const expiryDate = document.getElementById('payment-expiry').value;
    const cvv = document.getElementById('payment-cvv').value;

    if (!name || !address || !email || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all the details.');
        return;
    }

    const totalPrice = document.getElementById('total-price').textContent;
    alert(`Order placed successfully! Total: $${totalPrice}`);

    cart = [];
    updateCart();
    closeModal();
}

// Initialize event listeners for Add to Cart and Checkout buttons
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, price);
        });
    });

    // Add event listener to checkout button
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', checkout);

    // Close modal
    const closeButton = document.getElementById('close-modal');
    closeButton.addEventListener('click', closeModal);

    // Submit order
    const submitButton = document.getElementById('submit-order');
    submitButton.addEventListener('click', submitOrder);
});
