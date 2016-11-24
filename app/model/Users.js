var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Kreiramo shemu za korisnika
var userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        index: { unique: true }
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
    lozinka: {
        type: String,
        require: true,
        unique: false
    },
    createdAt: Date,
    updatedAt: Date
});

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