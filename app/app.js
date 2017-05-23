var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bower = require('bower');
var userRouter = require('../app/controller/users');
var aplikacijaRouter = require('../app/controller/aplikacije');
var dogadjajRouter = require('../app/controller/dogadjaji');


// connection with mongodb
mongoose.connect('mongodb://localhost/pracenje_gresaka_db')

// configuration of bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var port = process.env.PORT || 8181; 


//view of html files
app.get('/', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "primer01.html" ));
 });

app.get('/signup', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "signup.html" ));
 });

 app.get('/login', function(req, res){
     res.sendFile(path.join(__dirname + "/public/" + "login.html" ));
 });


// dodavanje rutera zu korisnike /users
app.use('/api/accounts', userRouter);
app.use('/api/app', aplikacijaRouter);
app.use('/api/dogadjaj', dogadjajRouter);
//klijentsku angular aplikaciju serviramo iz direktorijuma public
app.use('/app', express.static(__dirname + '/public/'));
//klijentsku angular aplikaciju serviramo iz direktorijuma client

//na kraju dodajemo middleware za obradu gresaka
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  //prikazivanje greske za neidentifikovanog korisnika
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    return res.json({"message" : err.name + ": " + err.message});
  }

  return res.status(status).json({
    message: message,
    error: error
  });
});


// Pokretanje servera
app.listen(port);


console.log('Server radi na portu ' + port);