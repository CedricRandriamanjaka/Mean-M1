const mongoose = require('mongoose');

const favori = mongoose.Schema({
    utilisateurIDClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' 
    },
    utilisateurIDEmploye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' 
    }
})

module.exports = mongoose.model('Favori', favori);