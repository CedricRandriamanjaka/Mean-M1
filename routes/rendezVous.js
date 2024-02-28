const express = require('express');
const router = express.Router();
const controllerRDV  = require('../controllers/rendezVous');
const moment = require('moment'); // Importez moment.js
// Créez un routeur Express

router.post('/ajouterRDV/:utilisateurID/:employeID/:serviceId/:date', async (req, res) => {
  try {
    // Récupération des données nécessaires depuis le corps de la requête
    const { utilisateurID,employeID, serviceId, date } = req.params;

    // Vérification si toutes les données requises sont fournies
    if (!utilisateurID || !employeID || !serviceId || !date ) {
      return res.status(400).json({ success: false, message: 'Veuillez fournir utilisateurID, serviceId et date.' });
    }

   // Convertir la date en objet JavaScript Date
   const parsedDate = moment(date).toDate();
    
   // Ajouter 3 heures à la date pour compenser le décalage horaire
   const dateAjustee = moment(parsedDate).add(3, 'hours').toDate();

    // Appel de la fonction ajouterRDV pour ajouter le rendez-vous
    const resultat = await controllerRDV.ajouterRDV(utilisateurID,employeID, serviceId, dateAjustee);

    // Envoyer la réponse appropriée en fonction du résultat de l'ajout du rendez-vous
    if (resultat.success) {
      return res.status(200).json({ success: true, message: resultat.message });
    } else {
      return res.status(400).json({ success: false, message: resultat.message });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du rendez-vous :', error);
    return res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du rendez-vous.' });
  }
});

router.get('/:userID',async (req,res) => {
  const {userID} = req.params;
  try{
    const resultat = await controllerRDV.getRDV(userID);
    res.status(200).json(resultat);

  }
  catch (error){
    console.error('Erreur lors de l\'ajout du rendez-vous :', error);
    return res.status(500).json({ success: false, message: 'Erreur lors de l obtention du rendez-vous.' });
  }
});

module.exports = router;