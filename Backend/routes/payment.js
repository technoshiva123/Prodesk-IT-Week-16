const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: { name: 'TaskMatrix Premium' },
                    unit_amount: 49900, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard`,
        });
        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ message: "Stripe Error", error: err.message });
    }
});

module.exports = router;