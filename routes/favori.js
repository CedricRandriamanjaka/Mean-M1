var express = require('express');
const router = express.Router();

const farovi = require("../controllers/favori");


router.get("/utilisateur/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const employes = await farovi.getFavorisUtilisateur(id);
      res.status(200).json(employes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  module.exports = router;