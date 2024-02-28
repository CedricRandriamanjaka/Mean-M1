var express = require("express");
const router = express.Router();

const CompetenceService = require("../services/competence");
const competenceService = new CompetenceService();

router.post("/", async (req, res) => {
  const { nomCompetence } = req.body;

  if (!nomCompetence) {
    return res
      .status(400)
      .json({ message: "Veuillez saisir une designation pour la compétence." });
  }

  try {
    const result = await competenceService.ajoutCompetence(nomCompetence);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const competences = await competenceService.getCompetences();
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/utilisateur/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const competences = await competenceService.getCompetencesUtilisateur(id);
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const competence = await competenceService.getCompetenceById(id);
    res.status(200).json(competence);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedCompetence = await competenceService.updateCompetence(
      id,
      updatedData
    );
    res.status(200).json(updatedCompetence);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await competenceService.deleteCompetence(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
