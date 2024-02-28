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

  // Ajouter une compétence à un utilisateur
router.post('/ajout/:idUser', async (req, res) => {

  try {
      const { idUser } = req.params;
      const { empID } = req.body;
      const prof = await farovi.ajouterFavori(idUser,empID);
      // return prof;
      res.status(201).json(prof);
  } catch (error) {
      console.error("Erreur lors de l'ajout de favori à l'utilisateur:", error);
      res.status(500).json({ error: 'Erreur lors de l ajout de favori à l utilisateur.' });
  }
});

router.post('/supp/:idUser', async (req, res) => {

  try {
      const { idUser } = req.params;
      const { empID } = req.body;
      farovi.suppFavori(idUser,empID);
      res.status(201).json({ message: 'favori supprimer avec succès à l\'utilisateur.' });
  } catch (error) {
      console.error("Erreur lors de suppresion de favori à l'utilisateur:", error);
      res.status(500).json({ error: 'Erreur lors de la suppresion de favori à l\'utilisateur.' });
  }
});

  module.exports = router;