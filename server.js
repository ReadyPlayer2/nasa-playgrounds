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
    res.redirect('/space');
});

app.get('/image', async function (req, res) {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=2019-03-22`);
    const imageJson = await response.json();

    res.send(imageJson);
});

app.get('/space', function (req, res) {
    res.send('Hello Space');
});

app.listen(PORT, () => console.log(`Express JS listening on port ${PORT}`));
