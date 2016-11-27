var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var path = require("path");

var secretKey = require(path.join(__dirname + '/key'));

//Kreiramo shemu za korisnika
var userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    ime: {
        type: String,
        require: true,
        unique: false
    },
    prezime: {
        type: String,
        require: true,
        unique: false
    },
    createdAt: Date,
    updatedAt: Date,

    // hash i salt se koriste umesto cuvanja lozinke korisnika
    hash: String,
    salt: String
});


// Hasujemo lozniku i takvu je cuvamo u bazu podataka
userSchema.methods.setPassword = function(lozinka){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(lozinka, this.salt, 1000, 64).toString('hex');
};

// Obrnuto radnja od hasovanja lozinke da bi smo mogli da je uporedimo sa unetom
userSchema.methods.validPassword = function(lozinka){
    var hash = crypto.pbkdf2Sync(lozinka, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

// Kreiramo token za cuvanje korisnikovih podataka pri prijavi i registraciji
userSchema.methods.generateJwt = function(){
    // Koliko dugo ce se cuvati
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    // sign metoda za kreiranje JWT-a
    return jwt.sign({
        _id: this._id,
        email: this.email,
        ime: this.ime,
        prezime: this.prezime,
        exp: parseInt(expiry.getTime() / 1000),
    }, secretKey.toString());
};

// Proveravamo da li je korisnik ulogovan
// Ukoliko nije ne moze da pristupi svom profilu
userSchema.methods.isLoggedIn = function(){
    var token = getToken();
}

// Pre nego sto korisnika sacuvano, odredjujemo vreme kreiranja ili azuriranja korisnika
userSchema.pre('save', function(next){

    //preuzimamo trenutni datum
    var currentDate = new Date();

    // postavimo trenutni datum poslednju izmenu
    this.updatedAt = currentDate;

    if(!this.createdAt)
        this.cratedAt = currentDate;

    // Prelazimo na sledecu funkciju u lancu
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;