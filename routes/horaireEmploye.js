const express = require('express');
const router = express.Router();
const controllerHoraire = require('../controllers/horaireEmploye');

router.post('/nouveauHoraire', async (req, res) => {
    const { utilisateurID, jour, heureDebut, heureFin } = req.body;

    try {
        const nouvelHoraire = await controllerHoraire.ajouterHoraire(utilisateurID, jour, heureDebut, heureFin);
        res.status(201).json(nouvelHoraire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour modifier un horaire existant
router.put('/modifierHoraire/:id', async (req, res) => {
    const { id } = req.params;
    const { utilisateurID, jour, heureDebut, heureFin } = req.body;

    try {
        const horaireModifie = await controllerHoraire.modifierHoraire(id, utilisateurID, jour, heureDebut, heureFin);
        res.status(200).json(horaireModifie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un horaire existant
router.delete('/supprimerHoraire/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const horaireSupprime = await controllerHoraire.supprimerHoraire(id);
        res.status(200).json(horaireSupprime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour lister tous les horaires
router.get('/horaires', async (req, res) => {
    try {
        const horaires = await controllerHoraire.listerHoraires();
        res.status(200).json(horaires);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour obtenir un horaire par son ID
router.get('/horaire/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const horaire = await controllerHoraire.obtenirHoraireParId(id);
        res.status(200).json(horaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour lister tous les horaires pour un utilisateur spécifique
router.get('/utilisateur/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const horairesUtilisateur = await controllerHoraire.listerHorairesUtilisateur(id);
        res.status(200).json(horairesUtilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;