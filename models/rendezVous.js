var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var rendezVous = new Schema({
    utilisateurID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' 
    },
    employeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' 
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    date : {  type: Date, required: true },
    etat : {  type: Boolean, required: true },
    payement : {  type: Boolean, required: true },
});



module.exports = mongoose.model('RendezVous',  rendezVous);