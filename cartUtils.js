// // Retrieve cart data from cookies
// export function getCartFromCookies() {
//     const cookieValue = document.cookie
//         .split("; ")
//         .find(row => row.startsWith("list-cart="));
//     return cookieValue ? JSON.parse(cookieValue.split("=")[1]) : [];
// }

// // Update cart data in cookies
// export function updateCartCookies(listCart) {
//     document.cookie = `list-cart=${JSON.stringify(listCart)}; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;`;
// }

// Retrieve cart data from local storage
export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("list-cart");
    return cart ? JSON.parse(cart) : [];
}

// Update cart data in local storage
export function updateCartLocalStorage(listCart) {
    localStorage.setItem("list-cart", JSON.stringify(listCart));
}

