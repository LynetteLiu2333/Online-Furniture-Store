// let iconCart = document.querySelector(".icon-cart");
// let cart = document.querySelector(".cart");
// let container = document.querySelector(".container");
// let close = document.querySelector(".close");

// iconCart.addEventListener("click", function(){
//     if(cart.style.right == "-100%"){
//         cart.style.right = "0";
//         container.style.transform = "translateX(-400px)";
//     }else{
//         cart.style.right = "-100%";
//         container.style.transform = "translateX(0)";
//     }
// });

// close.addEventListener("click", function (){
//     cart.style.right = "-100%";
//     container.style.transform = "translateX(0)";
// });

// let products = null;

// // get data from file json
// fetch("product.json")
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();
//     }); // <-- Missing semicolon added here

// //show datas product in list 
// function addDataToHTML(){
//     // remove datas default from HTML
//     let listProductHTML = document.querySelector(".list-product");
//     listProductHTML.innerHTML = "";

//     // add new datas
//     if(products != null) // if has data
//     {
//         products.forEach(product => {
//             let newProduct = document.createElement("div");
//             newProduct.classList.add("item");
//             newProduct.innerHTML = 
//             `<img src="${product.image}" alt="">
//             <h2>${product.name}</h2>
//             <div class="price">$${product.price}</div>
//             <button onclick="addCart(${product.id})">Add To Cart</button>`;

//             listProductHTML.appendChild(newProduct);

//         });
//     }
// }

// //use cookie so the cart doesn"t get lost on refresh page
// let listCart = [];
// function checkCart(){
//     var cookieValue = document.cookie
//     .split("; ")
//     .find(row => row.startsWith("list-cart="));
//     if(cookieValue){
//         listCart = JSON.parse(cookieValue.split("=")[1]);
//     }else{
//         listCart = [];
//     }
// }
// checkCart();

// function addCart($idProduct){
//     let productsCopy = JSON.parse(JSON.stringify(products));
//     //// If this product is not in the cart
//     if(!listCart[$idProduct]) 
//     {
//         listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
//         listCart[$idProduct].quantity = 1;
//     }else{
//         //If this product is already in the cart.
//         //I just increased the quantity
//         listCart[$idProduct].quantity++;
//     }
//     document.cookie = "list-cart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

//     addCartToHTML();
// }

// function addCartToHTML(){
//     // clear data default
//     let listCartHTML = document.querySelector(".list-cart");
//     listCartHTML.innerHTML = "";

//     let totalHTML = document.querySelector(".total-quantity");
//     let totalQuantity = 0;
//     // if has product in Cart
//     if(listCart){
//         listCart.forEach(product => {
//             if(product){
//                 let newCart = document.createElement("div");
//                 newCart.classList.add("item");
//                 newCart.innerHTML = 
//                     `<img src="${product.image}">
//                     <div class="content">
//                         <div class="name">${product.name}</div>
//                         <div class="price">$${product.price}</div>
//                     </div>
//                     <div class="quantity">
//                         <button onclick="changeQuantity(${product.id}, '-')"> - </button>
//                         <span class="value">${product.quantity}</span>
//                         <button onclick="changeQuantity(${product.id}, '+')"> + </button>
//                     </div>`;
//                 listCartHTML.appendChild(newCart);
//                 totalQuantity = totalQuantity + product.quantity;
//             }
//         });
//     }
//     totalHTML.innerText = totalQuantity;
// }

// function changeQuantity($idProduct, $type){
//     switch ($type) {
//         case "+":
//             listCart[$idProduct].quantity++;
//             break;
//         case "-":
//             listCart[$idProduct].quantity--;

//             // if quantity <= 0 then remove product in cart
//             if(listCart[$idProduct].quantity <= 0){
//                 delete listCart[$idProduct];
//             }
//             break;
    
//         default:
//             break;
//     }
//     // save new data in cookie
//     document.cookie = "list-cart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
//     // reload html view cart
//     addCartToHTML();
// }

// // Ensure addCartToHTML is called after all functions are defined
// addCartToHTML();
// import { getCartFromCookies, updateCartCookies } from './cartUtils.js';

// // DOM Elements
// const iconCart = document.querySelector(".icon-cart");
// const cart = document.querySelector(".cart");
// const container = document.querySelector(".container");
// const close = document.querySelector(".close");
// const listProductHTML = document.querySelector(".list-product");
// const listCartHTML = document.querySelector(".list-cart");
// const totalHTML = document.querySelector(".total-quantity");

// let products = [];
// let listCart = [];

// // Event Listeners
// iconCart.addEventListener("click", toggleCart);
// close.addEventListener("click", closeCart);

// // Fetch product data from JSON file
// fetch("product.json")
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         renderProductList();
//     });

// // Toggle cart visibility
// function toggleCart() {
//     const isCartHidden = cart.style.right === "-100%";
//     cart.style.right = isCartHidden ? "0" : "-100%";
//     container.style.transform = isCartHidden ? "translateX(-400px)" : "translateX(0)";
// }

// // Close cart
// function closeCart() {
//     cart.style.right = "-100%";
//     container.style.transform = "translateX(0)";
// }

// // Render products to the HTML
// function renderProductList() {
//     listProductHTML.innerHTML = "";

//     products.forEach(product => {
//         const newProduct = document.createElement("div");
//         newProduct.classList.add("item");
//         newProduct.innerHTML = `
//             <img src="${product.image}" alt="">
//             <h2>${product.name}</h2>
//             <div class="price">$${product.price}</div>
//             <button onclick="addToCart(${product.id})">Add To Cart</button>
//         `;
//         listProductHTML.appendChild(newProduct);
//     });
// }

// // Initialize cart from cookies
// listCart = getCartFromCookies();

// // Add product to cart
// function addToCart(productId) {
//     const product = products.find(product => product.id === productId);

//     if (!product) {
//         console.error(`Product with ID ${productId} not found.`);
//         return;
//     }

//     let productInCart = listCart.find(item => item && item.id === productId);

//     if (productInCart) {
//         productInCart.quantity++;
//     } else {
//         listCart.push({ ...product, quantity: 1 });
//     }

//     updateCartCookies();
//     renderCart();
// }

// // Render cart items to the HTML
// function renderCart() {
//     listCartHTML.innerHTML = "";
//     let totalQuantity = 0;

//     listCart.forEach(product => {
//         if (product) {
//             const newCartItem = document.createElement("div");
//             newCartItem.classList.add("item");
//             newCartItem.innerHTML = `
//                 <img src="${product.image}">
//                 <div class="content">
//                     <div class="name">${product.name}</div>
//                     <div class="price">$${product.price}</div>
//                 </div>
//                 <div class="quantity">
//                     <button onclick="changeQuantity(${product.id}, '-')"> - </button>
//                     <span class="value">${product.quantity}</span>
//                     <button onclick="changeQuantity(${product.id}, '+')"> + </button>
//                 </div>
//             `;
//             listCartHTML.appendChild(newCartItem);
//             totalQuantity += product.quantity;
//         }
//     });

//     totalHTML.innerText = totalQuantity;
// }

// // Change product quantity in cart
// function changeQuantity(productId, type) {
//     const productInCart = listCart.find(item => item && item.id === productId);

//     if (!productInCart) return;

//     if (type === "+") {
//         productInCart.quantity++;
//     } else if (type === "-") {
//         productInCart.quantity--;

//         if (productInCart.quantity <= 0) {
//             listCart = listCart.filter(item => item && item.id !== productId);
//         }
//     }

//     updateCartCookies();
//     renderCart();
// }

// // Initial render of cart
// renderCart();

// import { getCartFromCookies, updateCartCookies } from './cartUtils.js';

// // DOM Elements
// const iconCart = document.querySelector(".icon-cart");
// const cart = document.querySelector(".cart");
// const container = document.querySelector(".container");
// const close = document.querySelector(".close");
// const listProductHTML = document.querySelector(".list-product");
// const listCartHTML = document.querySelector(".list-cart");
// const totalHTML = document.querySelector(".total-quantity");

// let products = [];
// let listCart = [];

// // Event Listeners
// iconCart.addEventListener("click", toggleCart);
// close.addEventListener("click", closeCart);

// // Fetch product data from JSON file
// fetch("product.json")
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         renderProductList();
//     });

// // Toggle cart visibility
// function toggleCart() {
//     const isCartHidden = cart.style.right === "-100%";
//     cart.style.right = isCartHidden ? "0" : "-100%";
//     container.style.transform = isCartHidden ? "translateX(-400px)" : "translateX(0)";
// }

// // Close cart
// function closeCart() {
//     cart.style.right = "-100%";
//     container.style.transform = "translateX(0)";
// }

// // Render products to the HTML
// function renderProductList() {
//     listProductHTML.innerHTML = "";

//     products.forEach(product => {
//         const newProduct = document.createElement("div");
//         newProduct.classList.add("item");
//         newProduct.innerHTML = `
//             <img src="${product.image}" alt="">
//             <h2>${product.name}</h2>
//             <div class="price">$${product.price}</div>
//             <button onclick="addToCart(${product.id})">Add To Cart</button>
//         `;
//         listProductHTML.appendChild(newProduct);
//     });
// }

// // Initialize cart from cookies
// listCart = getCartFromCookies();

// // Add product to cart
// function addToCart(productId) {
//     const product = products.find(product => product.id === productId);

//     if (!product) {
//         console.error(`Product with ID ${productId} not found.`);
//         return;
//     }

//     let productInCart = listCart.find(item => item && item.id === productId);

//     if (productInCart) {
//         productInCart.quantity++;
//     } else {
//         listCart.push({ ...product, quantity: 1 });
//     }

//     updateCartCookies(listCart);
//     renderCart();
// }

// // Render cart items to the HTML
// function renderCart() {
//     listCartHTML.innerHTML = "";
//     let totalQuantity = 0;

//     listCart.forEach(product => {
//         if (product) {
//             const newCartItem = document.createElement("div");
//             newCartItem.classList.add("item");
//             newCartItem.innerHTML = `
//                 <img src="${product.image}">
//                 <div class="content">
//                     <div class="name">${product.name}</div>
//                     <div class="price">$${product.price}</div>
//                 </div>
//                 <div class="quantity">
//                     <button onclick="changeQuantity(${product.id}, '-')"> - </button>
//                     <span class="value">${product.quantity}</span>
//                     <button onclick="changeQuantity(${product.id}, '+')"> + </button>
//                 </div>
//             `;
//             listCartHTML.appendChild(newCartItem);
//             totalQuantity += product.quantity;
//         }
//     });

//     totalHTML.innerText = totalQuantity;
// }

// // Change product quantity in cart
// function changeQuantity(productId, type) {
//     const productInCart = listCart.find(item => item && item.id === productId);

//     if (!productInCart) return;

//     if (type === "+") {
//         productInCart.quantity++;
//     } else if (type === "-") {
//         productInCart.quantity--;

//         if (productInCart.quantity <= 0) {
//             listCart = listCart.filter(item => item && item.id !== productId);
//         }
//     }

//     updateCartCookies(listCart);
//     renderCart();
// }

// // Initial render of cart
// renderCart();

// // Make functions accessible globally
// window.addToCart = addToCart;
// window.changeQuantity = changeQuantity;

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
