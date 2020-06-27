const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');	

const config = require('config');
mongoose.set('useCreateIndex', true);

const developerRoute = require('./routes/developer');
const gameRoute = require('./routes/game')

app.use(cors());
app.use(bodyParser.json());

app.use('/developer', developerRoute);
app.use('/game', gameRoute);


let reqPath = path.join(__dirname, '../')

app.use(express.static(reqPath + '/client/src'));

app.get('*', (req, res) => {
    res.sendFile(reqPath + '/client/src/index.html');
});

dbURL = 'mongodb://localhost:27017/WebTech2'
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to database: " + dbURL);
});

var server = app.listen(9000, () =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
