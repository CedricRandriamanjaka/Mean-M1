const favori = require('../models/favori');
const Utililsateur = require('../models/utilisateur');

async function getFavorisUtilisateur(id) {
    const employes = [];
    try {
      const favorisClient = await favori.find({ utilisateurIDClient: id });
      const employeID = favorisClient.map(favoriClient => favoriClient.utilisateurIDEmploye);
      for (let i = 0; i < employeID.length; i++) {
          const employe = await Utililsateur.findById(employeID[i]);
          if (employe) {
            employes.push(employe);
          }
      }
      return employes; // Retourne la liste d'objets compétence de l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération des favorie:", error);
        return employes;
    }
  }

async function ajouterFavori(userID, empID) {
    try {
        // Vérifier d'abord si le profil existe déjà
        const existingFavori = await favori.findOne({
            utilisateurIDClient: userID,
            utilisateurIDEmploye: empID
        });

        if (existingFavori) {
            // Le profil existe déjà, vous pouvez choisir de ne rien faire ou de renvoyer un message
            console.log('Le favori existe déjà');
            // Vous pouvez choisir de renvoyer un message ou de ne rien faire ici
        } else {
            // Le profil n'existe pas encore, vous pouvez l'ajouter
            const fv = new favori({
                utilisateurIDClient: userID,
                utilisateurIDEmploye: empID
            });

            const profilAjoute = await fv.save(); // Enregistrez le profil dans la base de données et récupérez l'objet ajouté
            console.log(profilAjoute);
            return profilAjoute; // Retournez l'objet ajouté (compétence)
        }
    } catch (error) {
        throw error; // Gérez les erreurs, par exemple en les lançant à l'appelant
    }
}



async function suppFavori(userID, empID) {
    try {
        // Recherche le profil à supprimer
        const profil = await favori.deleteMany({
            utilisateurIDClient: userID,
            utilisateurIDEmploye: empID
        });

        if (!profil) {
            throw new Error('Erreur lors de la suppression du favori.');
        }
        return { success: true, message: 'favori et compétence supprimés avec succès.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}


module.exports = {
    ajouterFavori,
    suppFavori,
    getFavorisUtilisateur
};
