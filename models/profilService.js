const mongoose = require('mongoose');

const profilService = mongoose.Schema({
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    competenceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competence' 
    }
})

module.exports = mongoose.model('ProfilService', profilService);