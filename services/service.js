const profilEmployerEtClient = require('../models/profilEmployerEtClient');
const Service = require('../models/service');
const utilisateur = require('../models/utilisateur');

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

  async getEmployesByCompetence(serviceId) {
    try {
        // Récupérer les compétences du service spécifié
        const service = await Service.findById(serviceId).populate('competences');
        if (!service) {
            throw new Error('Service non trouvé');
        }
        const serviceCompetences = service.competences.map(comp => comp._id);

        // Récupérer les utilisateurs ayant au moins toutes les compétences requises
        const employes = await utilisateur.find({
            role: 2, // Rôle d'employé
            competences: { $all: serviceCompetences } // Au moins toutes les compétences requises
        });

        return employes;
    } catch (error) {
        console.error('Erreur lors de la recherche des employés:', error.message);
        return [];
    }
}

}

module.exports = ServiceService;
