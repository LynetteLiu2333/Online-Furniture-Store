// Import the cart data
import { getCartFromLocalStorage } from "./cartUtils.js";

// Add Stripe integration
const stripe = Stripe("pk_test_51PTALwFxXDljUjMN2pNE7esybRVBwEwpzcTIUwLHG6SEICAw4MW4XYc2e1NCL8ljFxw5XRXhdnzwHasky9Y3Z61J00fSSSiNXD");

// DOM Elements
const checkoutButton = document.querySelector(".button-checkout");

checkoutButton.addEventListener("click", async () => {
    const listCart = getCartFromLocalStorage();
    const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: listCart
        })
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
        // Display error to the customer
        console.error(result.error.message);
    }
});
