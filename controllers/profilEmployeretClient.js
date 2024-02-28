const ProfilEmployerEtClient = require('../models/profilEmployerEtClient');
const Utilisateur = require('../models/utilisateur');
const service = require('../services/service');

async function ajouterProfil(userID, competenceID) {
    try {
        // Vérifier d'abord si l'utilisateur existe
        const utilisateur = await Utilisateur.findById(userID);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé.');
        }

        // Vérifier si la compétence existe déjà dans le profil de l'utilisateur
        if (utilisateur.competences.includes(competenceID)) {
            console.log('La compétence existe déjà dans le profil de l\'utilisateur.');
            return utilisateur;
        }

        // Ajouter la compétence au profil de l'utilisateur
        utilisateur.competences.push(competenceID);
        await utilisateur.save();

        return utilisateur;
    } catch (error) {
        throw error;
    }
}

async function suppProfil(userID, competenceID) {
    try {
        // Vérifier d'abord si l'utilisateur existe
        const utilisateur = await Utilisateur.findById(userID);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé.');
        }

        // Supprimer la compétence du profil de l'utilisateur
        utilisateur.competences = utilisateur.competences.filter(comp => comp.toString() !== competenceID);
        await utilisateur.save();

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
