const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const pino = require('express-pino-logger')();


const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({origin: true, credentials: true}));
app.options('/url...', function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    return res.sendStatus(200);
 });



app.use(pino);

const infoRouter = require('./infoRouter');

app.use('/', infoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});