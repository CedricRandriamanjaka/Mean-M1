const Produit = require('../models/produit');

exports.createProduit = (req, res) => {
    const prod = new Produit(req.body);
    prod.save()
        .then((produit) => {
            return res.status(201).json({ produit })
        })
        .catch((error) => {
            return res.status(400).json({ error })
        })
}

exports.getOneProduct = (req, res) => {
    const id = req.params.id;
    Produit.findOne({ _id: id })
        .then((produit) => {
            return res.status(200).json({ produit })
        })
        .catch((error) => { return res.status(400).json({ error }) })
}

exports.getAllProduits = (req, res) => {
    Produit.find()
        .then((produit) => {
            return res.status(200).json({ produit })
        })
        .catch((error) => { return res.status(400).json({ error }) })
}