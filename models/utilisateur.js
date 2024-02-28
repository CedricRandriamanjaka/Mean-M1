const mongoose = require('mongoose');

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
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Utilisateur', utilisateur);