const Service = require('../models/service');
const Competence = require('../models/competence');

class ServiceService {
  async createService(data) {
    const {
      nomService,
      description,
      prix,
      duree,
      commission,
      dateDebut,
      dateFin,
      competences
    } = data;

    if (
      !nomService ||
      !description ||
      !prix ||
      !duree ||
      !commission
    ) {
      throw new Error('Veuillez remplir tous les champs.');
    }

    try {
      const service = new Service({
        nom: nomService,
        description,
        prix,
        duree,
        commission,
        dateDebut,
        dateFin,
        competences,
      });
      await service.save();

      return { success: true, message: 'Service created.'};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getServices() {
    try {
      const services = await Service.find();
      return services;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getServiceById(id) { 
    try {
      const service = await Service.findById(id);
      if (!service) {
        throw new Error('Service not found');
      }
      return service;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateService(id, updatedData) {
    try {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedService) {
        throw new Error('Service not found');
      }
      return updatedService;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteService(id) {
    try {
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) {
        throw new Error('Service not found');
      }
      return { message: 'Service deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCompetencesInService(serviceId) {
    const competences = [];
    try {
      let competenceServices = await ProfilService.find({serviceID  : serviceId});
      const competenceID = competenceServices.map(competenceService => competenceService.competenceID);
      for (let i = 0; i < competenceID.length; i++) {
          const competence = await Competence.findById(competenceID[i]);
          if (competence) {
            competences.push(competence);
          }
      }
      return competences;
    }catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ServiceService;
