var express = require("express");
const router = express.Router();

const StatistiquesService = require("../services/statistiques");
const statistiquesService = new StatistiquesService();

router.get("/depenseParMois/annee=:annee", async (req, res) => {
    const annee = parseInt(req.params.annee, 10);
    try {
      const depenseParMois = await statistiquesService.depenseParMois(annee);
      res.status(200).json(depenseParMois);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get("/chiffresAffaire/mois=:mois/annee=:annee", async (req, res) => {
    const mois = parseInt(req.params.mois, 10);
    const annee = parseInt(req.params.annee, 10);
    try {
      const chiffresAffaire = await statistiquesService.getChiffresAffairesAvecCommission(mois, annee);
      res.status(200).json(chiffresAffaire);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get("/beneficeParMois/annee=:annee", async (req, res) => {
    const annee = parseInt(req.params.annee, 10);
    try {
      const beneficeParMois = await statistiquesService.getBeneficeParMois(annee);
      res.status(200).json(beneficeParMois);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get("/countReservation/mois=:mois/annee=:annee", async (req, res) => {
    const mois = parseInt(req.params.mois, 10);
    const annee = parseInt(req.params.annee, 10);
    try {
      const countReservation = await statistiquesService.getNbReservation(mois, annee);
      res.status(200).json(countReservation);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  module.exports = router;