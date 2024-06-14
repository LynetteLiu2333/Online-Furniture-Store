// let listCart = [];

// function checkCart(){
//         var cookieValue = document.cookie
//         .split("; ")
//         .find(row => row.startsWith("list-cart="));
//         if(cookieValue){
//             listCart = JSON.parse(cookieValue.split("=")[1]);
//         }
// }

// checkCart();

// addCartToHTML();

// function addCartToHTML(){
//     // clear data default
//     let listCartHTML = document.querySelector(".return-cart .list");
//     listCartHTML.innerHTML = "";

//     let totalQuantityHTML = document.querySelector(".total-quantity");
//     let totalPriceHTML = document.querySelector(".total-price");
//     let totalQuantity = 0;
//     let totalPrice = 0;
//     // if has product in Cart
//     if(listCart){
//         listCart.forEach(product => {
//             if(product){
//                 let newCart = document.createElement("div");
//                 newCart.classList.add("item");
//                 newCart.innerHTML = 
//                     `<img src="${product.image}">
//                     <div class="info">
//                         <div class="name">${product.name}</div>
//                         <div class="price">$${product.price}</div>
//                     </div>
//                     <div class="quantity">${product.quantity}</div>
//                     <div class="return-price">$${product.price * product.quantity}</div>`;
//                 listCartHTML.appendChild(newCart);
//                 totalQuantity = totalQuantity + product.quantity;
//                 totalPrice = totalPrice + (product.price * product.quantity);
//             }
//         })
//     }
//     totalQuantityHTML.innerText = totalQuantity;
//     totalPriceHTML.innerText = "$" + totalPrice;
// }
import { getCartFromLocalStorage } from './cartUtils.js';

// DOM Elements
const listCartHTML = document.querySelector(".return-cart .list");
const totalQuantityHTML = document.querySelector(".total-quantity");
const totalPriceHTML = document.querySelector(".total-price");

let listCart = [];

// Initialize and render cart from cookies
function initCart() {
    listCart = getCartFromLocalStorage();
    renderCart();
}

// // Retrieve cart data from cookies
// function getCartFromCookies() {
//     const cookieValue = document.cookie
//         .split("; ")
//         .find(row => row.startsWith("list-cart="));
//     return cookieValue ? JSON.parse(cookieValue.split("=")[1]) : [];
// }

// Render cart items to the HTML
function renderCart() {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    listCart.forEach(product => {
        if (product) {
            const newCartItem = document.createElement("div");
            newCartItem.classList.add("item");
            newCartItem.innerHTML = `
                <img src="${product.image}">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="return-price">$${(product.price * product.quantity).toFixed(2)}</div>
            `;
            listCartHTML.appendChild(newCartItem);
            totalQuantity += product.quantity;
            totalPrice += product.price * product.quantity;
        }
    });

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = `$${totalPrice.toFixed(2)}`;
}

// Initialize the cart on page load
initCart();
