import { getCartFromLocalStorage, updateCartLocalStorage } from './cartUtils.js';

// DOM Elements
const iconCart = document.querySelector(".icon-cart");
const cart = document.querySelector(".cart");
const container = document.querySelector(".container");
const close = document.querySelector(".close");
const listProductHTML = document.querySelector(".list-product");
const listCartHTML = document.querySelector(".list-cart");
const totalHTML = document.querySelector(".total-quantity");

let products = [];
let listCart = [];

// Event Listeners
iconCart.addEventListener("click", toggleCart);
close.addEventListener("click", closeCart);

// Fetch product data from JSON file
fetch("product.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProductList();
    });

// Toggle cart visibility
function toggleCart() {
    const isCartHidden = cart.style.right === "-100%";
    cart.style.right = isCartHidden ? "0" : "-100%";
    container.style.transform = isCartHidden ? "translateX(-400px)" : "translateX(0)";
}

// Close cart
function closeCart() {
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)";
}

// Render products to the HTML
function renderProductList() {
    listProductHTML.innerHTML = "";

    products.forEach(product => {
        const newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addToCart(${product.id})">Add To Cart</button>
        `;
        listProductHTML.appendChild(newProduct);
    });
}

// Initialize cart from local storage
listCart = getCartFromLocalStorage();

// Add product to cart
function addToCart(productId) {
    const product = products.find(product => product.id === productId);

    if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    let productInCart = listCart.find(item => item && item.id === productId);

    if (productInCart) {
        productInCart.quantity++;
    } else {
        listCart.push({ ...product, quantity: 1 });
    }

    updateCartLocalStorage(listCart);
    renderCart();
}

// Render cart items to the HTML
function renderCart() {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;

    listCart.forEach(product => {
        if (product) {
            const newCartItem = document.createElement("div");
            newCartItem.classList.add("item");
            newCartItem.innerHTML = `
                <img src="${product.image}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')"> - </button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')"> + </button>
                </div>
            `;
            listCartHTML.appendChild(newCartItem);
            totalQuantity += product.quantity;
        }
    });

    totalHTML.innerText = totalQuantity;
}

// Change product quantity in cart
function changeQuantity(productId, type) {
    const productInCart = listCart.find(item => item && item.id === productId);

    if (!productInCart) return;

    if (type === "+") {
        productInCart.quantity++;
    } else if (type === "-") {
        productInCart.quantity--;

        if (productInCart.quantity <= 0) {
            listCart = listCart.filter(item => item && item.id !== productId);
        }
    }

    updateCartLocalStorage(listCart);
    renderCart();
}

// Initial render of cart
renderCart();

// Make functions accessible globally
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
