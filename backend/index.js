const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const RASA_SERVER = 'http://localhost:5005/webhooks/rest/webhook';

app.post('/chat', async (req, res) => {
    const message = req.body.message;

    try {
        const response = await axios.post(RASA_SERVER, {
            sender: 'user',
            message: message
        });

        const replies = response.data.map((r) => r.text).join(' ');
        res.json({ reply: replies });
    } catch (error) {
        res.status(500).send('Error communicating with Rasa server');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
