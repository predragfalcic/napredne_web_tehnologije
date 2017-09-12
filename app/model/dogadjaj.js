var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dogadjajSchema = new Schema({
    // Opciono polje koje govori o verziji aplikacije
    app_verzija: {
        type: String,
        require: false,
        unique: false
    },
    // Izuzetaci (stack greske)
    izuzeci:[{
        type: Schema.Types.ObjectId,
        ref: 'Izuzetak'
    }],
    // Fragment dogadjaja, odredjuje o kom delu aplikacije se radi
    fragment: {
        type: String,
        require: true,
        unique: false
    },
    // Vreme nastanka izuzetka
    vreme_nastanka: Date,
    // Dodatna proizvoljni podaci u JSON formatu
    proizv_podaci: {
        type: Object,
        require: false,
        unique: false
    }
});

// Pre nego sto korisnika sacuvano, odredjujemo vreme kreiranja ili azuriranja korisnika
dogadjajSchema.pre('save', function(next){

    //preuzimamo trenutni datum
    var currentDate = new Date();
    
    // postavimo trenutni datum poslednju izmenu
    this.vreme_nastanka = currentDate;
    next();
});

var Dogadjaj = mongoose.model('Dogadjaj', dogadjajSchema);

module.exports = Dogadjaj;