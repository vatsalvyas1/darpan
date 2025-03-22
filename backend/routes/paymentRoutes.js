const express = require('express');
const fetch = require('node-fetch'); // Ensure you have installed node-fetch

const router = express.Router();

router.post("/generatePaymentLink", async (req, res) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'x-client-id': process.env.CASHFREE_APPID,
                'x-client-secret': process.env.CASHFREE_SECRET,
                'x-api-version': '2025-01-01',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        };

        const response = await fetch('https://sandbox.cashfree.com/pg/links', options);
        if (!response.ok) {
            throw new Error("Something went wrong while generating the payment link");
        }

        const result = await response.json();

        // Send the result back to the client
        res.status(201).json(result);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;