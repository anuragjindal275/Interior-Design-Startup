const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');
const sendMail = require('../utils/mailer');

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const contact = new Contact({ name, email, phone, message });
        await contact.save();
        await sendMail(email, 'Contact Form Submission', `Thank you for your message, ${name}. We will get back to you shortly.`);
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("There was an error saving your message. Please try again.");
    }
});

module.exports = router;
