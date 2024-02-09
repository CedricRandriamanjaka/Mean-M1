var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var responsable = new Schema({
    utilisateurID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' 
    },
    rendezVousId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RendezVous' 
    },
    role : {  type: String, required: true },
});



module.exports = mongoose.model('Responsable',  responsable);