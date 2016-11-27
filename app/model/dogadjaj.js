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

var Dogadjaj = mongoose.model('Dogadjaj', dogadjajSchema);

module.exports = Dogadjaj;