// Retrieve cart data from local storage
export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("list-cart");
    return cart ? JSON.parse(cart) : [];
}

// Update cart data in local storage
export function updateCartLocalStorage(listCart) {
    localStorage.setItem("list-cart", JSON.stringify(listCart));
}

