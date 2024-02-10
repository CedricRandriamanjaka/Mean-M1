const express = require('express');
const router = express.Router();
const controllerUtilisateur = require('../controllers/utilisateur');

// Route pour ajouter un nouvel utilisateur
router.post('/nouveauUtilisateur', async (req, res) => {
    const { nom, prenom, dateNaissance, genre, email, motdepasse, role, etat } = req.body;

    try {
        const nouvelUtilisateur = await controllerUtilisateur.ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat);
        res.status(201).json(nouvelUtilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour modifier un utilisateur
router.put('/modifierUtilisateur/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, dateNaissance, genre, email, motdepasse, role, etat } = req.body;

    try {
        const utilisateurModifie = await controllerUtilisateur.modifierUtilisateur(id, nom, prenom, dateNaissance, genre, email, motdepasse, role, etat);
        res.status(200).json(utilisateurModifie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer un utilisateur
router.delete('/supprimerUtilisateur/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const utilisateurSupprime = await controllerUtilisateur.supprimerUtilisateur(id);
        res.status(200).json(utilisateurSupprime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour lister tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const utilisateurs = await controllerUtilisateur.listeUtilisateurs();
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour obtenir un utilisateur par son ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const utilisateur = await controllerUtilisateur.getUtilisateur(id);
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// route pur l inscription des clients
router.post('/inscription', async (req, res) => {
    const { nom, prenom, dateNaissance, genre, email, motdepasse } = req.body;
    const reponse = await controllerUtilisateur.inscription(nom, prenom, dateNaissance, genre, email, motdepasse);

    // Retourner la réponse en tant qu'objet JSON
    res.json(reponse);
});

module.exports = router;
