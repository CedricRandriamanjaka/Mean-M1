const Utilisateur = require('../models/utilisateur');

async function inscription(nom, prenom, dateNaissance, genre, email, motdepasse) {
    try {
        const role = 1; // Mettre le rôle à 1
        const etat = 'actif'; // Mettre l'état à 'actif'

        // Appeler la fonction ajouterUtilisateur avec les données fournies
        const utilisateurEnregistre = await ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat);

        // Retourner un objet contenant les informations sur l'inscription réussie
        return {
            type: 'success',
            numeroErreur: null,
            messageErreur: 'Inscription réussie',
            utilisateur: utilisateurEnregistre
        };
    } catch (error) {
        // Retourner un objet contenant les informations sur l'erreur d'inscription
        return {
            type: 'danger',
            numeroErreur: error.code,
            messageErreur: error.message
        };
    }
}

async function connection(email, motdepasse) {
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant.motdepasse === motdepasse) {
        return utilisateurExistant;
    } else {
        return {
            type: 'danger',
            numeroErreur: null,
            messageErreur: 'utilisateur non reconnue'
        };
    }
}



async function getUser(email) {
    const utilisateurExistant = await Utilisateur.findOne({ email });
    return utilisateurExistant;
}

async function ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat) {
    try {
        // Vérifier si l'e-mail est déjà présent dans la base de données
        const utilisateurExistant = await Utilisateur.findOne({ email });

        if (utilisateurExistant) {
            throw new Error('Un utilisateur avec cet e-mail existe déjà.');
        }

        // Créer une instance de Utilisateur avec les données fournies
        const nouvelUtilisateur = new Utilisateur({
            nom,
            prenom,
            dateNaissance,
            genre,
            email,
            motdepasse,
            role,
            etat
        });

        // Sauvegarder le nouvel utilisateur dans la base de données
        const utilisateurEnregistre = await nouvelUtilisateur.save();

        return utilisateurEnregistre;
    } catch (error) {
        // Gérer les erreurs de validation ou de base de données
        throw new Error('Impossible d\'ajouter un nouvel utilisateur : ' + error.message);
    }
}


async function modifierUtilisateur(id, nouveauNom, nouveauPrenom, nouvelleDateNaissance, nouveauGenre, nouveauEmail, nouveauMotdepasse, nouveauRole, nouvelEtat) {
    try {
        // Rechercher l'utilisateur par son ID
        const utilisateur = await Utilisateur.findById(id);

        // Vérifier si l'utilisateur existe
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        // Mettre à jour les données de l'utilisateur
        utilisateur.nom = nouveauNom;
        utilisateur.prenom = nouveauPrenom;
        utilisateur.dateNaissance = nouvelleDateNaissance;
        utilisateur.genre = nouveauGenre;
        utilisateur.email = nouveauEmail;
        utilisateur.motdepasse = nouveauMotdepasse;
        utilisateur.role = nouveauRole;
        utilisateur.etat = nouvelEtat;

        // Sauvegarder les modifications dans la base de données
        const utilisateurModifie = await utilisateur.save();

        return utilisateurModifie;
    } catch (error) {
        throw new Error('Impossible de modifier l\'utilisateur : ' + error.message);
    }
}

async function supprimerUtilisateur(id) {
    try {
        // Supprimer l'utilisateur par son ID
        const utilisateurSupprime = await Utilisateur.findByIdAndDelete(id);
        return utilisateurSupprime;
    } catch (error) {
        throw new Error('Impossible de supprimer l\'utilisateur : ' + error.message);
    }
}

async function listeUtilisateurs() {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const utilisateurs = await Utilisateur.find();
        return utilisateurs;
    } catch (error) {
        throw new Error('Impossible de lister les utilisateurs : ' + error.message);
    }
}

async function getUtilisateur(id) {
    try {
        // Récupérer l'utilisateur par son ID
        const utilisateur = await Utilisateur.findById(id);
        return utilisateur;
    } catch (error) {
        throw new Error('Impossible d\'obtenir l\'utilisateur : ' + error.message);
    }
}

module.exports = {
    ajouterUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur,
    listeUtilisateurs,
    getUtilisateur,
    inscription,
    getUser,
    connection
};