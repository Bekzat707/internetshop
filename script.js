// script.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartSection = document.querySelector('.cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = product.querySelector('p').textContent;

            cartItems.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    const updateCart = () => {
        cartSection.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartSection.appendChild(cartItem);
        });

        const removeButtons = cartSection.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems.splice(index, 1);
                updateCart();
            });
        });
    };

    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', () => {
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
    });

    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        alert(`Thank you for your order, ${name}! We will ship your items to ${address}.`);

        // Optionally, clear the cart and form fields
        cartItems.length = 0;
        updateCart();
        checkoutForm.reset();
    });
});
