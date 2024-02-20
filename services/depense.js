const Depense = require("../models/depensesExtra");
const DepenseType = require("../models/depenceType");

class DepenseService {
  async ajoutDepense(description, montant, date, depenseType) {

    if (!description || !montant || !date) {
      throw new Error("Veuillez remplir tous les champs.");
    }

    try {
      const depense = new Depense({
        depenseType,
        description,
        montant,
        date,
      });
      await depense.save();

      return { success: true, message: "Depense created." };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDepense() {
    try {
      const depenses = await Depense.find();
      return depenses;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTypeDepense() {
    try {
      const types = await DepenseType.find();
      return types;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async ajoutTypeDepense(nomDepense) {
    if (!nomDepense) {
        throw new Error("Veuillez remplir tous les champs.");
      }
  
      try {
        const depenseType = new DepenseType({
            nomDepense,
        });
        await depenseType.save();
  
        return { success: true, message: "Type Depense created." };
      } catch (error) {
        throw new Error(error.message);
      }
  }
}

module.exports = DepenseService;
