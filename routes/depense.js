var express = require('express');
const router = express.Router();

const DepenseService = require('../services/depense');
const depenseService = new DepenseService();

router.post('/types', async (req, res) => {
    const data = req.body;
  
    try {
      const result = await depenseService.ajoutTypeDepense(data.nomDepense);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post('/', async (req, res) => {
    const data = req.body;
  
    try {
      const result = await depenseService.ajoutDepense(data.description, data.montant, data.date, data.depenseTypeID);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/types', async (req, res) => {
  
    try {
      const depenseType = await depenseService.getTypeDepense();
      res.status(200).json(depenseType);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
  
    try {
      const depense = await depenseService.getDepense();
      res.status(200).json(depense);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });


module.exports = router;

