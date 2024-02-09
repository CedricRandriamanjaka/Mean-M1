const mongoose = require('mongoose');

const profilEmployerEtClient = mongoose.Schema({
    utilisateurID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' // Référence au modèle Utilisateur
    },
    competenceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur' // Référence au modèle Utilisateur
    }
})

module.exports = mongoose.model('ProfilEmployerEtClient', profilEmployerEtClient);