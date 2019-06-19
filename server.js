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
    res.send('Hello World!!!')
});

app.get('/image', async function (req, res) {
    var response;
    if (req.query.api_key != null) {
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${req.query.api_key}&count=5`);
    } else {
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`);
    }
    
    const imageJson = await response.json();

    // Log the number of remaining requests
    console.log(response.headers.get('X-RateLimit-Remaining'));

    res.send(createImageObjectArray(imageJson));
});

var createImageObjectArray = function (res) {
    let images = [];

    // iterate over all returned images and store details in state
    for (let i = 0; i < res.length; i++) {
        const imageObj = {
            url: res[i]['url'],
            hdurl: res[i]['hdurl'],
            title: res[i]['title'],
            explanation: res[i]['explanation'],
            date: res[i]['date'],
            copyright: res[i]['copyright'],
            media_type: res[i]['media_type']
        }

        images.push(imageObj);
    }

    return images;
}

app.listen(PORT, () => console.log(`Express JS listening on port ${PORT}`));