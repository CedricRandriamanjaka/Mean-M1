const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const utilisateur = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
        required: true
    },
    genre: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    etat: {
        type: String
    },
    competences : [{type : Schema.Types.ObjectId , ref : 'Competence'}]
})

module.exports = mongoose.model('Utilisateur', utilisateur);