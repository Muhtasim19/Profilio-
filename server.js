const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (your HTML, CSS, etc.)
app.use(express.static('public'));

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Set up the Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '27mhaq@cpsd.us', // replace with your email
            pass: 'Muhtasim@33',  // replace with your email password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: '27mhaq@cpsd.us', // replace with your email
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error: Unable to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Success: Email sent!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
