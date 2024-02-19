var express = require('express');
const router = express.Router();

const ProfilServiceService = require('../services/profilService');
const profilServiceService = new ProfilServiceService();

router.post('/addProfilService', async (req, res) => {
    const serviceId = req.body.serviceId;
    const competenceId = req.body.competenceId;
  
    try {
      const result = await profilServiceService.addCompetenceIntoService(serviceId, competenceId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/:id/competences', async (req,res) => {
    const { id } = req.params;
  
    try {
      const service = await profilServiceService.getAllCompetencesInService(id);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  module.exports = router;