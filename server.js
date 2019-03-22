const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/image', function (req, res) {
    res.send('GET request for /image');
});

app.listen(PORT, () => console.log(`Express JS listening on port ${PORT}`));