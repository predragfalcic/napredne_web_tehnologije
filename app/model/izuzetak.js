var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var izuzetakSchema = new Schema({
    // Vreme nastanka izuzetka
    vreme_nastanka: {
        type: Date,
        require: true,
        unique: false
    },
    // Dodatna proizvoljni podaci u JSON formatu
    proizv_podaci: {
        type: Object,
        require: false,
        unique: false
    }
});

// Pre nego sto izuzetak sacuvano, odredjujemo vreme kreiranja
izuzetakSchema.pre('save', function(next){

    //preuzimamo trenutni datum
    var currentDate = new Date();

    // postavimo trenutni datum poslednju izmenu
    this.vreme_nastanka = currentDate;

    if(!this.vreme_nastanka)
        this.vreme_nastanka = currentDate;

    // Prelazimo na sledecu funkciju u lancu
    next();
});

var Izuzetak = mongoose.model('Izuzetak', izuzetakSchema);

module.exports = Izuzetak;