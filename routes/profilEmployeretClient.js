const express = require('express');
const router = express.Router();
const ProfilEmployerEtClient = require('../controllers/profilEmployeretClient');

// Ajouter une compétence à un utilisateur
router.post('/competences/ajout/:idUser', async (req, res) => {

    try {
        const { idUser } = req.params;
        const { competenceID } = req.body;
        const prof = await ProfilEmployerEtClient.ajouterProfil(idUser,competenceID);
        // return prof;
        res.status(201).json(prof);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la compétence à l'utilisateur:", error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la compétence à l\'utilisateur.' });
    }
});

router.post('/competences/supp/:idUser', async (req, res) => {

    try {
        const { idUser } = req.params;
        const { competenceID } = req.body;
        ProfilEmployerEtClient.suppProfil(idUser,competenceID);
        res.status(201).json({ message: 'Compétence supprimer avec succès à l\'utilisateur.' });
    } catch (error) {
        console.error("Erreur lors de suppresion de la compétence à l'utilisateur:", error);
        res.status(500).json({ error: 'Erreur lors de la suppresion de la compétence à l\'utilisateur.' });
    }
});

module.exports = router;
