const Competence = require('../models/competence');

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
