const Competence = require('../models/competence');
const ProfilEmployerEtClient = require('../models/profilEmployerEtClient');

class CompetenceService {
  async ajoutCompetence(nomCompetence) {
    try {
      const competence = new Competence({ nomCompetence });
      await competence.save();
      return { success: true, message: 'Competence created.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCompetences() {
    try {
      const competences = await Competence.find();
      return competences;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCompetencesUtilisateur(id) {
    const competences = [];
    try {
      const profils = await ProfilEmployerEtClient.find({ utilisateurID: id });
      const competenceIDs = profils.map(profil => profil.competenceID);
      for (let i = 0; i < competenceIDs.length; i++) {
          const competence = await Competence.findOne({ _id: competenceIDs[i] });
          if (competence) {
              competences.push(competence);
          }
      }
      return competences; // Retourne la liste d'objets compétence de l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération des compétences de l'utilisateur:", error);
        return competences;
    }
  }

  async getCompetenceById(id) {
    try {
      const competence = await Competence.findById(id);
      if (!competence) {
        throw new Error('Competence not found');
      }
      return competence;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCompetence(id, updatedData) {
    try {
      const updatedCompetence = await Competence.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedCompetence) {
        throw new Error('Competence not found');
      }
      return updatedCompetence;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCompetence(id) {
    try {
      const deletedCompetence = await Competence.findByIdAndDelete(id);
      if (!deletedCompetence) {
        throw new Error('Competence not found');
      }
      return { message: 'Competence deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CompetenceService;
