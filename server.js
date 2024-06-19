const express = require("express");
const path = require("path");
const stripe = require("stripe")("sk_test_51PTALwFxXDljUjMNBaIrJIERzmDjAeMH6OjKp58HVYj8kISMJxOovPHTaius9cQo2O2qBO1W8xQYsSiluljYEe1A00EgNfkZw2");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to create a Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
    const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "https://online-furniture-store.onrender.com/checkout.html",
            cancel_url: "https://online-furniture-store.onrender.com/checkout.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
// Open website on: http://localhost:3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
