var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    nom : {  type: String, required: true },
    description : {  type: String, required: true },
    prix : {  type: Number, required: true },
    duree : {  type: Number, required: true },
    commission : {  type: Number, required: true },
    dateDebut : Date,
    dateFin : Date,
    competences : [{type : Schema.Types.ObjectId , ref : 'Competence'}],
});

module.exports = mongoose.model('Service',  ServiceSchema);