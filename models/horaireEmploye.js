const mongoose = require('mongoose');

const horaireEmploye = mongoose.Schema({
    utilisateurID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' // Référence au modèle Utilisateur
    },
    jour: {
        type: Number,
        required: true
    },
    heureDebut: {
        type: String,
        required: true
    },
    heureFin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('HoraireEmploye', horaireEmploye);