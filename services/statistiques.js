const Depense = require("../models/depensesExtra");
const RendezVous = require("../models/rendezVous");
const DepenseType = require("../models/depenceType");

class StatistiquesService {
    async depenseParMois(annee) {
        try {
            // Obtenez tous les mois de l'année et toutes les années uniques dans vos données
            const moisDeLAnnee = Array.from({ length: 12 }, (_, i) => i + 1);

            // Effectuez l'agrégation pour obtenir les dépenses par mois
            const result = await Depense.aggregate([
                {
                    $addFields: {
                        date: { $toDate: "$date" }, // Convertir la chaîne de caractères en objet de date
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$date" },
                            year: { $year: "$date" },
                        },
                        totalDepense: { $sum: "$montant" },
                    },
                },
                {
                    $match: {
                        "_id.year": annee,
                    },
                }
                
                
            ]).exec();

            console.log('result'+result);

            // Créez un tableau pour stocker les résultats finaux avec des dépenses de 0 pour les mois sans dépense
                const resultWithZero = moisDeLAnnee.map((mois) => {
                    const depensePourMois = result.find(
                        (item) => item._id.month === mois && item._id.year === annee
                    );
                    // console.log(depensePourMois);

                    return {
                        annee,
                        mois,
                        totalDepense: depensePourMois ? depensePourMois.totalDepense : 0,
                    };
                });
           

            console.log(resultWithZero);
            return resultWithZero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getChiffresAffairesAvecCommission(mois, annee) {
        // Obtenez tous les mois de l'année et toutes les années uniques dans vos données
        const moisDeLAnnee = Array.from({ length: 12 }, (_, i) => i + 1);

        let aggregationPipeline = [
            {
                $match: {
                    payement: true,
                },
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "service",
                },
            },
            {
                $unwind: "$service",
            },
        ];

        // Condition pour grouper par mois et année si mois n'est pas 0
        if (mois !== 0) {
            let monthlyPipeline = [
                {
                    $group: {
                        _id: {
                            jour: { $dayOfMonth: "$date" },
                            mois: { $month: "$date" },
                            annee: { $year: "$date" },
                        },
                        totalMontant: { $sum: "$service.prix" },
                    },
                },
                {
                    $match: {
                        "_id.mois": mois,
                    },
                },
            ];

            aggregationPipeline.push(...monthlyPipeline);
        } else {
            //si mois n'existe pas
            let monthlyPipeline = [
                {
                    $group: {
                        _id: {
                            mois: { $month: "$date" },
                            annee: { $year: "$date" },
                        },
                        totalMontant: { $sum: "$service.prix" },
                    },
                },
            ];

            aggregationPipeline.push(...monthlyPipeline);
        }

        // Ajouter la condition pour filtrer par année
        aggregationPipeline.push({
            $match: {
                "_id.annee": annee,
            },
        });

        console.log('aggregationPipeline'+aggregationPipeline);
        try {
            const result = await RendezVous.aggregate(aggregationPipeline);
            
            // Créez un tableau pour stocker les résultats finaux avec des dépenses de 0 pour les mois sans dépense
            let resultWithZero;
                if (mois !== 0) {
                    resultWithZero = this.getAllDaysOfMonth(mois, annee).map((jour) => {
                        // console.log(jour);
                        const depensePourJour = result.find(
                            (item) =>
                                item._id.jour === jour &&
                                item._id.mois === mois &&
                                item._id.annee === annee
                        );
                        // console.log(depensePourJour);
                        return {
                            annee,
                            mois,
                            jour,
                            totalDepense: depensePourJour ? depensePourJour.totalMontant : 0,
                        };
                    });
                } else {
                    resultWithZero = moisDeLAnnee.map((mois) => {
                        const depensePourMois = result.find(
                            (item) => item._id.mois === mois && item._id.annee === annee
                        );
                        return {
                            annee,
                            mois,
                            totalDepense: depensePourMois ? depensePourMois.totalMontant : 0,
                        };
                    });
                }
           

            console.log(resultWithZero);
            return resultWithZero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllDaysOfMonth(year, month) {
        // Note: Month is 0-indexed in JavaScript (0 = January, 1 = February, ..., 11 = December)
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];
        for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
            days.push(day);
        }

        return days;
    }

    async getBeneficeParMois(annee) {
        try {
            // Obtenez les chiffres d'affaires avec commission
            const chiffresAffaires = await this.getChiffresAffairesAvecCommission(0, annee);
            console.log('chiffresAffaires'+chiffresAffaires);
    
            // Obtenez les dépenses par mois
            const depenses = await this.depenseParMois(annee);
            console.log('depenses'+depenses);
    
    
            // Boucle pour soustraire les valeurs correspondantes
            const result = chiffresAffaires.map((chiffre, index) => {
                const depense = depenses[index];
                console.log('chiffre.totalMontant'+chiffre.totalDepense)
                console.log('chiffre.totalDepense'+depense.totalDepense)
                return {
                    annee: chiffre.annee,
                    mois: chiffre.mois,
                    totalBenefice: chiffre.totalDepense - depense.totalDepense,
                };
            });
    
            console.log('result'+result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getNbReservation(mois, annee) {
        // Obtenez tous les mois de l'année et toutes les années uniques dans vos données
        const moisDeLAnnee = Array.from({ length: 12 }, (_, i) => i + 1);
        let aggregationPipeline;

        // Condition pour grouper par mois et année si mois n'est pas 0
        if (mois !== 0) {
            aggregationPipeline = [
                {
                    $group: {
                        _id: {
                            jour: { $dayOfMonth: "$date" },
                            mois: { $month: "$date" },
                            annee: { $year: "$date" },
                        },
                        count: { $sum: 1 }
                    },
                },
                {
                    $match: {
                        "_id.mois": mois,
                        "_id.annee": annee,
                    },
                },
            ];

        } else {
            //si mois n'existe pas
            aggregationPipeline = [
                {
                    $group: {
                        _id: {
                            mois: { $month: "$date" },
                            annee: { $year: "$date" },
                        },
                        count: { $sum: 1 }
                    },
                },
                {
                    $match: {
                        "_id.annee": annee,
                    },
                }
            ];
        }


        console.log('aggregationPipeline',aggregationPipeline);
        try {
            const result = await RendezVous.aggregate(aggregationPipeline);
            let resultWithZero;
                if (mois !== 0) {
                    resultWithZero = this.getAllDaysOfMonth(mois, annee).map((jour) => {
                        // console.log(jour);
                        const countPourJour = result.find(
                            (item) =>
                                item._id.jour === jour &&
                                item._id.mois === mois &&
                                item._id.annee === annee
                        );
                        // console.log(countPourJour);
                        return {
                            annee,
                            mois,
                            jour,
                            count: countPourJour ? countPourJour.count : 0,
                        };
                    });
                } else {
                    resultWithZero = moisDeLAnnee.map((mois) => {
                        const countPourMois = result.find(
                            (item) => item._id.mois === mois && item._id.annee === annee
                        );
                        return {
                            annee,
                            mois,
                            count: countPourMois ? countPourMois.count : 0,
                        };
                    });
                }
                       

            console.log(resultWithZero);
            return resultWithZero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StatistiquesService;
