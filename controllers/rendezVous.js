// Importez le modèle RendezVous et d'autres dépendances nécessaires
const RendezVous = require('../models/rendezVous');

// Définissez votre fonction pour ajouter un rendez-vous
async function ajouterRDV(utilisateurID,employeID, serviceId, date) {
  try {
    // Vérifiez s'il existe déjà un rendez-vous identique
    const rendezVousExistant = await RendezVous.findOne({ utilisateurID, serviceId, date });

    if (rendezVousExistant) {
      return { success: false, message: 'Un rendez-vous identique existe déjà.' };
    }

    // Si aucun rendez-vous identique n'est trouvé, créez un nouveau rendez-vous
    const nouveauRDV = new RendezVous({
      utilisateurID,
      employeID,
      serviceId,
      date,
      etat: true, // Supposons que l'état est toujours vrai par défaut
      payement: true // Supposons que le paiement est toujours vrai par défaut
    });

    // Enregistrez le nouveau rendez-vous dans la base de données
    await nouveauRDV.save();

    return { success: true, message: 'Rendez-vous ajouté avec succès.' };
  } catch (error) {
    return { success: false, message: 'Erreur lors de l\'ajout du rendez-vous.' };
  }
}

// Exportez la fonction pour pouvoir l'utiliser dans d'autres fichiers
module.exports = { ajouterRDV };
