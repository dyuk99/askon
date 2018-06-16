const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

const api = require('./routes/api');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/askon_db')
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/api", api);

const PORT = process.env.PORT || 8090;

app.get('/',
    async (req,res) => {
        try {
            res.sendFile('index.html');
        } catch (e) {
            res.send('API error');
        }
    });

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s', PORT);
});