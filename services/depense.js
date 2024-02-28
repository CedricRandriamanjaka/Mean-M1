const Depense = require("../models/depensesExtra");
const DepenseType = require("../models/depenceType");

class DepenseService {
  async ajoutDepense(description, montant, date, depenseType) {
    if (!description || !montant || !date) {
      throw new Error("Veuillez remplir tous les champs.");
    }

    try {
      const depense = new Depense({
        depenseTypeID: depenseType,
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

  async getDepense(annee, mois, jour) {
    console.log(mois);
    console.log(annee);
    console.log(jour);
    try {
      const filterExpr = {};
      filterExpr.$and = [];

      if (mois !== 0) {
        filterExpr.$and.push({ $eq: [{ $month: "$date" }, mois] });
      }

      if (jour !== 0) {
        filterExpr.$and.push({ $eq: [{ $dayOfMonth: "$date" }, jour] });
      }

      if (annee !== 0) {
        filterExpr.$and.push({ $eq: [{ $year: "$date" }, annee] });
      }

      const depenses = await Depense.find({
        $expr: filterExpr,
      }).populate("depenseTypeID");
      // for (let i = 0; i < depenses.length; i++) {
      //   console.log("date: " + depenses[i].date.toISOString().split("T")[0]);
      // }

      // Formatter la date dans chaque objet du tableau
      const depensesFormatees = depenses.map((depense) => ({
        _id: depense._id,
        depenseTypeID: depense.depenseTypeID,
        date: depense.date.toISOString().split("T")[0],
        description: depense.description,
        montant: depense.montant,
      }));

      // console.log(depensesFormatees);

      return depensesFormatees;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteDepense(id) {
    try {
      const deletedDepense = await Depense.findByIdAndDelete(id);
      if (!deletedDepense) {
        throw new Error('Depense not found');
      }
      return { message: 'Depense deleted successfully' };
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

  async getTypeDepenseById(id) {
    try {
      const types = await DepenseType.findById(id);
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
