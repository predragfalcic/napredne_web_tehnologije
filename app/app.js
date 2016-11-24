var express = require('express');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var user = require(path.join(__dirname+'/model/Users'));

mongoose.connect('mongodb://localhost/pracenje_gresaka_db')

var port = process.env.PORT || 8080; // na kom portu slusa server

// ruter za blogEntries
var userEntryRouter = express.Router(); // koristimo express Router

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/html/index.html'));
});

// Kreiramo novog korisnika
var pera = user({
  email: 'pera2@gmail.com',
  ime: 'Pera',
  prezime: 'Peric',
  lozinka: 'lozinka'
});

// Pozivamo ugradjenu save metodu
pera.save(function(err){
    if (err) throw err;

    console.log('User uspesno sacuvan.');
})

// Kreiramo rutere
var userRouter = express.Router();

userRouter
    .get('/signup', function(req, res){
        user.find({}, function(err, user){
            if (err) throw err;

            res.json(user);
            console.log(user);
        })
    })
    .post('/login', function(req, res){
        res.end(user);
    });


// dodavanje rutera zu korisnike /users
app.use('/accounts', userRouter);


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