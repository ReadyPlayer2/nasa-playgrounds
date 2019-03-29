require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/image', async function (req, res) {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`);
    const imageJson = await response.json();

    // Log the number of remaining requests
    console.log(response.headers.get('X-RateLimit-Remaining'));

    res.send(imageJson);
});

app.listen(PORT, () => console.log(`Express JS listening on port ${PORT}`));