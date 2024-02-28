var express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { email, password } = require("../env.js");

const CompetenceService = require("../services/competence");
const competenceService = new CompetenceService();

router.post("/", async (req, res) => {
  const { nomCompetence } = req.body;

  if (!nomCompetence) {
    return res
      .status(400)
      .json({ message: "Veuillez saisir une designation pour la compétence." });
  }

  try {
    // const result = await competenceService.ajoutCompetence(nomCompetence);
    let config = {
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "Mihoby",
        intro: "Hello!",
        table: {
          data: [
            {
              item: "Blabla",
              description: "Descri",
            },
          ],
        },
        outro: "Looking forward to..",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: email,
      to: "mi12razafimahefa@gmail.com",
      subject: "Email",
      html: mail,
    };

    
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Erreur lors de l\'envoi de l\'email : ' + error.toString());
        }
        console.log('Email envoyé : ' + info.response);
        res.status(200).send('Email envoyé : ' + info.response);
      });

    // res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const competences = await competenceService.getCompetences();
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/utilisateur/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const competences = await competenceService.getCompetencesUtilisateur(id);
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const competence = await competenceService.getCompetenceById(id);
    res.status(200).json(competence);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedCompetence = await competenceService.updateCompetence(
      id,
      updatedData
    );
    res.status(200).json(updatedCompetence);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await competenceService.deleteCompetence(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
