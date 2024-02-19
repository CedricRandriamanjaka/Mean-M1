const ProfilEmployerEtClient = require('../models/profilEmployerEtClient');
const Utilisateur = require('../models/Utilisateur');
const service = require('../services/service');

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

async function getEmployeInCategorie(competenceID) {
    const employes = [];
  
    try {
      let utilisateurs = await ProfilEmployerEtClient.find({ competenceID: competenceID });
  
      // Utilisez la méthode map pour itérer sur les utilisateurs avec des opérations asynchrones
      await Promise.all(
        utilisateurs.map(async (utilisateur) => {
          try {
            let utilisateurDetail = await Utilisateur.findById(utilisateur.utilisateurID);
  
            // Vérifiez si l'utilisateur a un rôle égal à 2 avant d'ajouter au tableau
            if (utilisateurDetail && utilisateurDetail.role === 2) {
              employes.push(utilisateurDetail);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error.message);
          }
        })
      );
  
      return employes;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  async function getAllEmployeesInService(serviceId) {
    const employees = [];
    try {
        let competences = await service.getAllCompetencesInService(serviceId);
        for(let i=0; i<competences.length;i++) {
            let employesDuService = await getEmployeInCategorie(competences[i]._id);
            employees.push(...employesDuService); 
        }
        return employees;
    }catch(err) {
        throw new Error(err.message);
    }
  }


module.exports = {
    ajouterProfil,
    suppProfil,
    getEmployeInCategorie,
    getAllEmployeesInService
};
