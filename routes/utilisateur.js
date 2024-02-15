const express = require('express');
const router = express.Router();
const controllerUtilisateur = require('../controllers/utilisateur');
const middlewareUtilisateur = require('../middleware/utilisateur');
const jwt = require('jsonwebtoken');



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
router.get('/getUtilisateur/:id', async (req, res) => {
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



// Route pour connection et génération de token JWT
router.post('/connection', async (req, res) => {
    const { email, motdepasse } = req.body;
    const resultatConnexion = await controllerUtilisateur.connection(email, motdepasse);

    if (resultatConnexion.email) {
        // Créer un token JWT avec les informations de l'utilisateur
        const token = jwt.sign(resultatConnexion.toJSON(), 'tok', { expiresIn: '1h' });

        // Enregistrer le token dans un cookie
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true }); // MaxAge en millisecondes (1h dans cet exemple)

        res.json(resultatConnexion); // Envoyer le token JWT sous forme d'objet JSON
    } else {
        res.status(400).send(resultatConnexion.messageErreur);
        console.log("erreur de connection");
    }
});

router.get('/getUserSession', async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        try {
            // Vérifier et décoder le token JWT
            const decoded = jwt.verify(token, 'tok');

            // Utilise les informations du token (decoded) ici pour obtenir les informations de session de l'utilisateur
            res.status(200).json(decoded);
        } catch (err) {
            // Gérer les erreurs de vérification du token (par exemple, token expiré ou invalide)
            res.status(400).send('Token invalide ou expiré');
        }
    } else {
        res.status(400).send('Non connecté');
    }
});

// route pour déconnexion
router.get('/deconnection', async (req, res) => {
    // Effacer le cookie contenant le token
    res.clearCookie('token');

    // Envoyer une réponse indiquant que la déconnexion a été effectuée avec succès
    res.status(200).send('Déconnexion réussie');
});

module.exports = router;
