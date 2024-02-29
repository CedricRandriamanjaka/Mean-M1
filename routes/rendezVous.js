const express = require('express');
const router = express.Router();
const controllerRDV  = require('../controllers/rendezVous');


router.get('/get/allRV', async (req, res) => {
  try {
    const rvs = await controllerRDV.getAllRDV();
    res.status(200).json(rvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;