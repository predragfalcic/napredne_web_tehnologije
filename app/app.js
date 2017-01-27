var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userRouter = require('../app/controller/users');
var aplikacijaRouter = require('../app/controller/aplikacije');
var dogadjajRouter = require('../app/controller/dogadjaji');

// konekcija sa bazom
mongoose.connect('mongodb://localhost/pracenje_gresaka_db')

// konfigurisemo bodyParser()
// da bismo mogli da preuzimamo podatke iz POST zahteva
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8181; // na kom portu slusa server

//Prikazivanje html fajlova.
app.get('/', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "index.html" ));
 });

app.get('/signup', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "signup.html" ));
 });

 app.get('/login', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "login.html" ));
 });


// dodavanje rutera zu korisnike /users
app.use('/accounts', userRouter);
app.use('/app', aplikacijaRouter);
app.use('/dogadjaj', dogadjajRouter);

//na kraju dodajemo middleware za obradu gresaka
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});


// Pokretanje servera
app.listen(port);


console.log('Server radi na portu ' + port);