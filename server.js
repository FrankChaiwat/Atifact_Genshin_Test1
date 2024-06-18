const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// เสิร์ฟไฟล์ในโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-notify', (req, res) => {
    const token = 'eKH6yRh4dEig6CqZc5cPwsyw7ayandpR2zQKnGs1I5p';
    const message = req.body.message;

    axios.post('https://notify-api.line.me/api/notify', `message=${encodeURIComponent(message)}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        res.json({ status: 'success', data: response.data });
    })
    .catch(error => {
        res.status(500).json({ status: 'error', message: error.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
