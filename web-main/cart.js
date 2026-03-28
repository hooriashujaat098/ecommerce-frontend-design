// Shopping Cart Logic
const CART_STORAGE_KEY = 'ecommerce_cart';

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Function to update the cart badge in the navbar
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Function to add an item to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    alert(`${product.name} added to cart!`);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (typeof renderCart === 'function') renderCart();
}

// Function to update quantity
function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            if (typeof renderCart === 'function') renderCart();
        }
    }
}

// Initialize badge on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
