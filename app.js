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
let caller = [
    process.env.DARSH_PHONE_NUMBER,
    // process.env.C1_PHONE_NUMBER,
    // process.env.R1_PHONE_NUMBER,
    // process.env.B1_PHONE_NUMBER
]
// POST endpoint to receive JSON data

const callerHandler = async (credentials) => {
    if(credentials.length==0)
        return {success:"calling done"};
    await client.calls.create({
        twiml: `<Response><Say>ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLDALERT GOLD ALERT GOLDALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD ALERT GOLD</Say></Response>`,
        to:credentials[credentials.length-1],
        from:process.env.TWILIO_PHONE_NUMBER
    });
    return callerHandler(credentials.slice(0,credentials.length-1))
}
app.post('/', async (req, res) => {
    const jsonData = req.body;
    if (jsonData.phone === 'true') {
        res.json(await callerHandler(caller));
    } else {
        res.json({ message: 'No call initiated' });
    }
    res.end()
});

const port = process.env.PORT;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 


// const express = require('express');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const app = express();

// // Twilio credentials
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Static phone numbers (plz enter verified phone numbers)
// const from = process.env.TWILIO_PHONE_NUMBER; // Twilio phone number
// const to = process.env.DARSH_PHONE_NUMBER; // The number you want to call

// // POST endpoint to receive JSON data
// app.post('/', (req, res) => {
//     const jsonData = req.body;
//     if (jsonData.phone === 'true') {
//         client.calls
//             .create({
//                 twiml: `<Response><Say>HELLO</Say></Response>`,
//                 to,
//                 from,
//             })
//             .then(call => {
//                 res.json({ message: 'Call initiated successfully', callSid: call.sid });
//             })
//             .catch(err => {
//                 res.json({ error: 'Failed to initiate call' });
//             });
//     } else {
//         res.json({ message: 'No call initiated' });
//     }
// });

// const port = process.env.PORT;
// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// }); 