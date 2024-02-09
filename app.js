const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const RouterProduit = require('./routes/produit');
const RouterUtilisateur = require('./routes/utilisateur');
const RouterHoraire = require('./routes/horaireEmploye');

var apiCompetences = require("./routes/competence");
var apiServices = require("./routes/service");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/services", apiServices)
app.use("/api/competences", apiCompetences)

// var mongoURI = "mongodb+srv://mihobyfahasoavana:crud-express@cluster0.eeg3doq.mongodb.net/mongo-express?retryWrites=true&w=majority";
var mongoURI = "mongodb+srv://Cedric:Cedric@meanproject.vuk6uvm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => {
    console.log("connection reussit")
}).catch((error) => {
    console.log(error)
});

// app.use('/api/produit/', RouterProduit)
app.use('/api/utilisateur/', RouterUtilisateur)
app.use('/api/horaire/', RouterHoraire)

app.get('/', (req, res) => {
    res.send("hello word")
});

module.exports = app;