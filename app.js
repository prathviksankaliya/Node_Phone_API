const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// Twilio credentials
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static phone numbers (plz enter verified phone numbers)
const from = process.env.TWILIO_PHONE_NUMBER; // Twilio phone number
const to = process.env.PRATHVIK_PHONE_NUMBER; // The number you want to call

// POST endpoint to receive JSON data
app.post('/', (req, res) => {
    const jsonData = req.body;
    if (jsonData.phone === 'true') {
        client.calls
            .create({
                twiml: `<Response><Say>HELLO</Say></Response>`,
                to,
                from,
            })
            .then(call => {
                res.json({ message: 'Call initiated successfully', callSid: call.sid });
            })
            .catch(err => {
                res.json({ error: 'Failed to initiate call' });
            });
    } else {
        res.json({ message: 'No call initiated' });
    }
});

const port = process.env.PORT;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 