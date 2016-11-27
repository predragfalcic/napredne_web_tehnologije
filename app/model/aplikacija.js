var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aplikacijeSchema = new Schema({
    naziv: {
        type: String,
        require: true,
        unique: false
    },
    opis: {
        type: String,
        require: true,
        unique: false
    },
    verzija: {
        type: String,
        require: false,
        unique: false
    },
    repozitorijum: {
        type: String,
        require: false,
        unique: false
    },
    //Odgovorna osoba za datu aplikaciju
    odg_osoba: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    //Osobe koje su dodate na aplikaciji
    dodate_osobe:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Domen sa kog aplikacija salje gresku
    // Jedinstveno odredjuje aplikaciju
    DSN: {
        type: String,
        require: true,
        unique: true
    },
    // Registrovani dogadjaji za datu aplikaciju
    dogadjaji: [{
        type: Schema.Types.ObjectId,
        ref: 'Dogadjaj'
    }]
});

var Aplikacija = mongoose.model('Aplikacija', aplikacijeSchema);

module.exports = Aplikacija;


