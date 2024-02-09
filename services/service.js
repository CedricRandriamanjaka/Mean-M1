const Service = require('../models/service');

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
    } = data;

    if (
      !nomService ||
      !description ||
      !prix ||
      !duree ||
      !commission ||
      !dateDebut ||
      !dateFin
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
      });
      await service.save();
      return { success: true, message: 'Service created.' };
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
}

module.exports = ServiceService;
