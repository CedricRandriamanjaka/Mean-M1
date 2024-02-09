const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const RouterProduit = require('./routes/produit');
const RouterUtilisateur = require('./routes/utilisateur');
const RouterHoraire = require('./routes/horaireEmploye');

mongoose.connect('mongodb+srv://Cedric:Cedric@meanproject.vuk6uvm.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("connection reussit")
}).catch((error) => {
    console.log(error)
});

app.use(bodyParser.json());
// app.use('/api/produit/', RouterProduit)
app.use('/api/utilisateur/', RouterUtilisateur)
app.use('/api/horaire/', RouterHoraire)

// app.get('/', (req, res) => {
//     res.send("hello word")
// });

module.exports = app;