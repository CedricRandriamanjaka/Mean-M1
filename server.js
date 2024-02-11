const http = require('http');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

// Middleware CORS
app.use(cors());

// Configuration de express-session
app.use(session({
    secret: '7530',
    resave: false,
    saveUninitialized: true
}));

// Importez et utilisez vos routes ici
const routes = require('./app'); // Assurez-vous que le chemin est correct
app.use(routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000");
});
