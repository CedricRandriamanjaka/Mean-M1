const HoraireEmploye = require('../models/horaireEmploye');

async function ajouterHoraire(utilisateurID, jour, heureDebut, heureFin) {
    try {
        // Créer une instance d horaire avec les données fournies
        const nouvelHoraire = new HoraireEmploye({
            utilisateurID,
            jour,
            heureDebut,
            heureFin,
        });

        // Sauvegarder le nouveau horaire dans la base de données
        const horaireEnregistre = await nouvelHoraire.save();

        return horaireEnregistre;
    } catch (error) {
        throw new Error('Impossible d\'ajouter un nouvel horaire : ' + error.message);
    }
}

async function modifierHoraire(id, nouvelUtilisateurID, nouveauJour, nouvelleHeureDebut, nouvelleHeureFin) {
    try {
        // Rechercher l'horaire par son ID
        const horaire = await HoraireEmploye.findById(id);

        // Vérifier si l'horaire existe
        if (!horaire) {
            throw new Error('Horaire non trouvé');
        }

        // Mettre à jour les données de l'horaire
        horaire.utilisateurID = nouvelUtilisateurID;
        horaire.jour = nouveauJour;
        horaire.heureDebut = nouvelleHeureDebut;
        horaire.heureFin = nouvelleHeureFin;

        // Sauvegarder les modifications dans la base de données
        const horaireModifie = await horaire.save();

        return horaireModifie;
    } catch (error) {
        throw new Error('Impossible de modifier l\'horaire : ' + error.message);
    }
}

async function supprimerHoraire(id) {
    try {
        // Supprimer l'horaire par son ID
        const horaireSupprime = await HoraireEmploye.findByIdAndDelete(id);
        return horaireSupprime;
    } catch (error) {
        throw new Error('Impossible de supprimer l\'horaire : ' + error.message);
    }
}

async function listerHoraires() {
    try {
        // Récupérer tous les horaires de la base de données
        const horaires = await HoraireEmploye.find();
        return horaires;
    } catch (error) {
        throw new Error('Impossible de lister les horaires : ' + error.message);
    }
}

async function obtenirHoraireParId(id) {
    try {
        // Récupérer l'horaire par son ID
        const horaire = await HoraireEmploye.findById(id);
        return horaire;
    } catch (error) {
        throw new Error('Impossible d\'obtenir l\'horaire : ' + error.message);
    }
}

async function listerHorairesUtilisateur(utilisateurID) {
    try {
        // Récupérer tous les horaires pour l'utilisateur spécifié
        const horairesUtilisateur = await HoraireEmploye.find({ utilisateurID });
        return horairesUtilisateur;
    } catch (error) {
        throw new Error('Impossible de lister les horaires pour cet utilisateur : ' + error.message);
    }
}

module.exports = {
    ajouterHoraire,
    modifierHoraire,
    supprimerHoraire,
    listerHoraires,
    obtenirHoraireParId,
    listerHorairesUtilisateur // Ajout de la nouvelle fonction
};