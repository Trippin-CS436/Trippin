var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var itineraryRouter = require('./routes/itinerary-leann-dev');


// read the .env file for URI
require('dotenv').config();

const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const uri =  "mongodb+srv://trippin_admin:trippin_admin_123@trippin-ue6od.mongodb.net/TrippinDB?retryWrites=true&w=majority";
//connect to mongodb
mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true,  useFindAndModify: false });

const connection = mongoose.connection;
const port = 9000;


connection.once("open", function() {
  console.log("Connected to MongoDB successfully");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/itinerary', itineraryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.options('/url...', function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");
  return res.sendStatus(200);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
