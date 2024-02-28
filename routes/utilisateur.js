const express = require('express');
const router = express.Router();
const controllerUtilisateur = require('../controllers/utilisateur');
const middlewareUtilisateur = require('../middleware/utilisateur');
const jwt = require('jsonwebtoken');

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: './public/Images/Employe',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// Route pour ajouter un nouvel utilisateur
// router.post('/nouveauUtilisateur', upload.single('image'), async (req, res) => {
//     const { nom, prenom, dateNaissance, genre, email, motdepasse, role, etat } = req.body;

//     try {
//         const nouvelUtilisateur = await controllerUtilisateur.ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat, req.file);
//         res.status(201).json(nouvelUtilisateur);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Route pour modifier un utilisateur
// router.put('/modifierUtilisateur/:id', upload.single('image'), async (req, res) => {
//     const { id } = req.params;
//     const { nom, prenom, dateNaissance, genre, email, motdepasse, role, etat } = req.body;
//     console.log(req.body);
//     console.log(req.file);
//     try {
//         const utilisateurModifie = await controllerUtilisateur.modifierUtilisateur(id, nom, prenom, dateNaissance, genre, email, motdepasse, role, etat, req.file);
//         res.status(200).json(utilisateurModifie);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

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

router.get('/byId/:id', async (req, res) => {
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


// Route pour obtenir un utilisateur par son role
router.get('/byRole/:role', async (req, res) => {
    const { role } = req.params;
    const roleNumber = parseInt(role, 10);
    // console.log(roleNumber);
    try {
        const utilisateur = await controllerUtilisateur.getUtilisateurByRole(roleNumber);
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour connection et génération de token JWT
router.post('/connection', async (req, res) => {
    const { email, motdepasse } = req.body;
    const resultatConnexion = await controllerUtilisateur.connection(email, motdepasse);

    if (resultatConnexion.email) {
        res.json(resultatConnexion); // Envoyer le token JWT sous forme d'objet JSON
    } else {
        res.status(400).send(resultatConnexion.messageErreur);
        console.log("erreur de connection");
    }
});

router.get('/getIndispoDate/:iduser/:idservice', async (req, res) => {
    const { iduser } = req.params;
    const { idservice } = req.params;
    try {
        const dates = await controllerUtilisateur.getIndispoDate(iduser,idservice);
        res.status(200).json(dates);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;