const ProfilEmployerEtClient = require('../models/profilEmployerEtClient');

async function ajouterProfil(userID, competenceID) {
        const profil = new ProfilEmployerEtClient({
            utilisateurID: userID,
            competenceID: competenceID
        });

        await profil.save();
}

async function suppProfil(userID, competenceID) {
    try {
        // Recherche le profil à supprimer
        const profil = await ProfilEmployerEtClient.findOne({
            utilisateurID: userID,
            competenceID: competenceID
        });

        if (!profil) {
            throw new Error('Profil non trouvé.');
        }

        // Supprime le profil
        const deletedProfil = await ProfilEmployerEtClient.findByIdAndDelete(profil._id);

        if (!deletedProfil) {
            throw new Error('Erreur lors de la suppression du profil.');
        }

        // Supprime la compétence associée si nécessaire
        const deletedCompetence = await Competence.findByIdAndDelete(competenceID);

        if (!deletedCompetence) {
            throw new Error('Erreur lors de la suppression de la compétence.');
        }

        return { success: true, message: 'Profil et compétence supprimés avec succès.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}


module.exports = {
    ajouterProfil,
    suppProfil
};
