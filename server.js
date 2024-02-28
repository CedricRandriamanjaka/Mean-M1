const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

// Clé secrète pour signer les tokens JWT
const secretKey = 'tok';

// Middleware CORS
app.use(cors());
app.use(express.json());

// Importez et utilisez vos routes ici
const routes = require('./app');
app.use(routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000");
});
