const ProfilService = require("../models/profilService");
const Competence = require('../models/competence');

class ProfilServiceService {
  async addCompetenceIntoService(serviceID, competenceID) {
    try {
        const existingProfilService = await ProfilService.findOne({
            serviceID: serviceID,
            competenceID: competenceID
        });

        if(existingProfilService) {
            return {
                success: false,
                message: "Ce Profil existe déja.",
              };
        } else {
            const serviceCompetence = new ProfilService({
                serviceID: serviceID,
                competenceID: competenceID,
              });
        
              await serviceCompetence.save();
        
              return {
                success: true,
                message: "Competence and service added in ProfilService.",
              };
        }
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCompetencesInService(serviceId) {
    const competences = [];
    try {
      let competenceServices = await ProfilService.find({
        serviceID: serviceId,
      });
      const competenceID = competenceServices.map(
        (competenceService) => competenceService.competenceID
      );
      for (let i = 0; i < competenceID.length; i++) {
        const competence = await Competence.findById(competenceID[i]);
        if (competence) {
          competences.push(competence);
        }
      }
      return competences;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProfilServiceService;
