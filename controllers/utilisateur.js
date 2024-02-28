const Utilisateur = require('../models/utilisateur');
const RendezVous = require('../models/rendezVous');
const Service = require('../models/service');
const HoraireEmploye = require('../models/horaireEmploye');
const moment = require('moment');
const service = require('../models/service');


async function inscription(nom, prenom, dateNaissance, genre, email, motdepasse) {
    try {
        const role = 1; // Mettre le rôle à 1
        const etat = 'actif'; // Mettre l'état à 'actif'

        // Appeler la fonction ajouterUtilisateur avec les données fournies
        const utilisateurEnregistre = await ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat);

        // Retourner un objet contenant les informations sur l'inscription réussie
        return {
            type: 'success',
            numeroErreur: null,
            messageErreur: 'Inscription réussie',
            utilisateur: utilisateurEnregistre
        };
    } catch (error) {
        // Retourner un objet contenant les informations sur l'erreur d'inscription
        return {
            type: 'danger',
            numeroErreur: error.code,
            messageErreur: error.message
        };
    }
}

async function connection(email, motdepasse) {
    const utilisateurExistant = await Utilisateur.findOne({ email });
    try {
        if (utilisateurExistant.motdepasse === motdepasse) {
            return utilisateurExistant;
        } else {
            return {
                type: 'danger',
                numeroErreur: null,
                messageErreur: 'utilisateur non reconnue'
            };
        }
    } catch {
        return {
            type: 'danger',
            numeroErreur: null,
            messageErreur: 'utilisateur non reconnue'
        };
    }

}



async function getUser(email) {
    const utilisateurExistant = await Utilisateur.findOne({ email });
    return utilisateurExistant;
}

async function ajouterUtilisateur(nom, prenom, dateNaissance, genre, email, motdepasse, role, etat) {
    try {
        // Vérifier si l'e-mail est déjà présent dans la base de données
        const utilisateurExistant = await Utilisateur.findOne({ email });

        if (utilisateurExistant) {
            throw new Error('Un utilisateur avec cet e-mail existe déjà.');
        }

        // Créer une instance de Utilisateur avec les données fournies
        const nouvelUtilisateur = new Utilisateur({
            nom,
            prenom,
            dateNaissance,
            genre,
            email,
            motdepasse,
            role,
            etat
        });

        // Sauvegarder le nouvel utilisateur dans la base de données
        const utilisateurEnregistre = await nouvelUtilisateur.save();

        return utilisateurEnregistre;
    } catch (error) {
        // Gérer les erreurs de validation ou de base de données
        throw new Error('Impossible d\'ajouter un nouvel utilisateur : ' + error.message);
    }
}


async function modifierUtilisateur(id, nouveauNom, nouveauPrenom, nouvelleDateNaissance, nouveauGenre, nouveauEmail, nouveauMotdepasse, nouveauRole, nouvelEtat) {
    try {
        // Rechercher l'utilisateur par son ID
        const utilisateur = await Utilisateur.findById(id);

        // Vérifier si l'utilisateur existe
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        // Mettre à jour les données de l'utilisateur
        utilisateur.nom = nouveauNom;
        utilisateur.prenom = nouveauPrenom;
        utilisateur.dateNaissance = nouvelleDateNaissance;
        utilisateur.genre = nouveauGenre;
        utilisateur.email = nouveauEmail;
        utilisateur.motdepasse = nouveauMotdepasse;
        utilisateur.role = nouveauRole;
        utilisateur.etat = nouvelEtat;

        // Sauvegarder les modifications dans la base de données
        const utilisateurModifie = await utilisateur.save();

        return utilisateurModifie;
    } catch (error) {
        throw new Error('Impossible de modifier l\'utilisateur : ' + error.message);
    }
}

async function supprimerUtilisateur(id) {
    try {
        // Supprimer l'utilisateur par son ID
        const utilisateurSupprime = await Utilisateur.findByIdAndDelete(id);
        return utilisateurSupprime;
    } catch (error) {
        throw new Error('Impossible de supprimer l\'utilisateur : ' + error.message);
    }
}

async function listeUtilisateurs() {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const utilisateurs = await Utilisateur.find();
        return utilisateurs;
    } catch (error) {
        throw new Error('Impossible de lister les utilisateurs : ' + error.message);
    }
}

async function getUtilisateur(id) {
    try {
        // Récupérer l'utilisateur par son ID
        const utilisateur = await Utilisateur.findById(id);
        return utilisateur;
    } catch (error) {
        throw new Error('Impossible d\'obtenir l\'utilisateur : ' + error.message);
    }
}

async function getUtilisateurByRole(role) {
    try {
        // Récupérer l'utilisateur par son role
        const utilisateur = await Utilisateur.find({ role: role }).exec();
        return utilisateur;
    } catch (error) {
        throw new Error('Impossible d\'obtenir l\'utilisateur : ' + error.message);
    }
}


// beta
async function getIndispoDate(utilisateurID, serviceID) {
    try {
        const utilisateur = await Utilisateur.findById(utilisateurID);
        const service = await Service.findById(serviceID);
        // const currentDate = moment();
        const currentDate = moment().startOf('day');
        const maxDate = moment().add(2, 'weeks').endOf('day');


        // Récupérer les rendez-vous de l'utilisateur dans la plage de dates spécifiée #
        const rendezVousIndispo = await getIndispoDatesRendezVous(utilisateurID, currentDate, maxDate, service);

        // Récupérer les indisponibilités horaires de l'utilisateur dans la plage de dates spécifiée VALIDE
        const horairesIndispo = await getIndispoDateHoraire(utilisateur, currentDate, maxDate);

        // Combinaison des indisponibilités trouvées VALIDE
        const indisponibilites = combineIndispoDates(rendezVousIndispo, horairesIndispo, service.duree);
        const currentInterval = [{ debut: new Date(currentDate), fin: new Date(moment()) }];
        const indisponibilites2 = combineIndispoDates(indisponibilites, currentInterval, service.duree);

        return indisponibilites2;
    } catch (error) {
        console.error('Erreur lors de la récupération des indisponibilités:', error.message);
        return [];
    }
}

async function getIndispoDatesRendezVous(utilisateur, debut, fin, service) {
    try {
        // Récupérer les rendez-vous de l'utilisateur dans la plage de dates spécifiée pour le service
        const rendezVous = await RendezVous.find({
            employeID: utilisateur,
            serviceId:service._id,
            etat : true,
            date: { $gte: debut, $lte: fin }
        });


        // Calculer les intervalles de rendez-vous et les ajouter à une liste d'indisponibilités
        const indispoDates = rendezVous.map(rendezVous => {
            const debutRdv = moment(rendezVous.date).toDate();
            const finRdv = moment(rendezVous.date).add(service.duree, 'minutes').toDate();

            return { debut: debutRdv, fin: finRdv };
        });
        indispoDates.sort((a, b) => a.debut - b.debut);
        return indispoDates;
    } catch (error) {
        console.error('Erreur lors de la récupération des indisponibilités liées aux rendez-vous:', error);
        throw error; // Renvoyer l'erreur pour une gestion plus précise
    }
}

async function getDispoDateHoraire(utilisateur, debut, fin) {
    const dispoIntervals = [];
    const horaires = await HoraireEmploye.find({ utilisateurID: utilisateur._id });

    // Récupérer le nombre de jours entre debut et fin
    const nbJours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= nbJours; i++) {
        const currentDate = new Date(debut);
        currentDate.setDate(currentDate.getDate() + i);

        // Récupérer l'index du jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
        const indexJour = currentDate.getDay();

        // Vérifier si l'utilisateur est disponible pour ce jour de la semaine
        const horaireJour = horaires.find(horaire => horaire.jour === indexJour);
        if (horaireJour) {
            const debutInterval = new Date(currentDate);
            const finInterval = new Date(currentDate);
            const debutHeure = parseInt(horaireJour.heureDebut.split(':')[0]) + 3;
            const debutMinute = parseInt(horaireJour.heureDebut.split(':')[1]);
            const finHeure = parseInt(horaireJour.heureFin.split(':')[0]) + 3;
            const finMinute = parseInt(horaireJour.heureFin.split(':')[1]);

            // Ajustement des heures et des minutes
            debutInterval.setHours(debutHeure, debutMinute, 0, 0);
            finInterval.setHours(finHeure, finMinute, 0, 0);

            dispoIntervals.push({ debut: debutInterval, fin: finInterval });
        }
    }
    dispoIntervals.sort((a, b) => a.debut - b.debut);
    return dispoIntervals;
}



async function getIndispoDateHoraire(utilisateur, debut, fin) {
    // Appeler la fonction getDispoDateHoraire pour obtenir les disponibilités de l'utilisateur
    const dispoIntervals = await getDispoDateHoraire(utilisateur, debut, fin);

    if (dispoIntervals.length === 0) {
        // Si aucune liste n'est donnée, retourner l'intervalle complet de début à fin
        return [{ debut: new Date(debut), fin: new Date(fin) }];
    }

    // Trier les intervalles de disponibilité par ordre croissant de début
    dispoIntervals.sort((a, b) => a.debut - b.debut);

    const indispoIntervals = [];
    let startIndispo = new Date(debut);

    // Parcourir les intervalles de disponibilité
    for (const interval of dispoIntervals) {
        // Si l'intervalle de disponibilité commence après le début de la période
        if (interval.debut > startIndispo) {
            // Ajouter l'intervalle entre startIndispo et le début de l'intervalle de disponibilité actuel
            indispoIntervals.push({ debut: startIndispo, fin: interval.debut });
        }
        // Mettre à jour startIndispo pour le prochain intervalle
        startIndispo = interval.fin;
    }

    // Ajouter l'intervalle entre la fin du dernier intervalle de disponibilité et la fin de la période
    if (startIndispo < fin) {
        indispoIntervals.push({ debut: startIndispo, fin: new Date(fin) });
    }

    return indispoIntervals;
}





function combineIndispoDates(indispo1, indispo2, dureeService) {
    const combinedIndispo = [];
    const allIndispo = [...indispo1, ...indispo2];
    allIndispo.sort((a, b) => a.debut - b.debut); // Tri par ordre croissant des débuts

    let currentIndispo = allIndispo[0];
    for (let i = 1; i < allIndispo.length; i++) {
        const nextIndispo = allIndispo[i];
        // Calculer la fin de l'indisponibilité actuelle + durée du service en millisecondes
        const currentIndispoFinPlusDuree = new Date(currentIndispo.fin.getTime() + (dureeService * 60000));
        if (currentIndispoFinPlusDuree >= nextIndispo.debut) {
            // Les intervalles se chevauchent, fusionner
            currentIndispo.fin = new Date(Math.max(currentIndispo.fin.getTime(), nextIndispo.fin.getTime()));
        } else {
            // Pas de chevauchement, ajouter l'intervalle actuel et passer au suivant
            combinedIndispo.push(currentIndispo);
            currentIndispo = nextIndispo;
        }
    }

    // Ajouter le dernier intervalle
    combinedIndispo.push(currentIndispo);

    return combinedIndispo;
}




module.exports = {
    ajouterUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur,
    listeUtilisateurs,
    getUtilisateur,
    inscription,
    getUser,
    connection,
    getUtilisateurByRole,
    getIndispoDate
};