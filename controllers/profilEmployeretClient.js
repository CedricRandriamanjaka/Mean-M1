const ProfilEmployerEtClient = require('../models/profilEmployerEtClient');

async function ajouterProfil(userID, competenceID) {
    try {
        // Vérifier d'abord si le profil existe déjà
        const existingProfil = await ProfilEmployerEtClient.findOne({
            utilisateurID: userID,
            competenceID: competenceID
        });

        if (existingProfil) {
            // Le profil existe déjà, vous pouvez choisir de ne rien faire ou de renvoyer un message
            console.log('Le profil existe déjà');
            // Vous pouvez choisir de renvoyer un message ou de ne rien faire ici
        } else {
            // Le profil n'existe pas encore, vous pouvez l'ajouter
            const profil = new ProfilEmployerEtClient({
                utilisateurID: userID,
                competenceID: competenceID
            });

            const profilAjoute = await profil.save(); // Enregistrez le profil dans la base de données et récupérez l'objet ajouté
            console.log(profilAjoute);
            return profilAjoute; // Retournez l'objet ajouté (compétence)
        }
    } catch (error) {
        throw error; // Gérez les erreurs, par exemple en les lançant à l'appelant
    }
}



async function suppProfil(userID, competenceID) {
    try {
        // Recherche le profil à supprimer
        const profil = await ProfilEmployerEtClient.deleteMany({
            utilisateurID: userID,
            competenceID: competenceID
        });

        if (!profil) {
            throw new Error('Erreur lors de la suppression du profil.');
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
