const express = require('express');

const router = express.Router();
const ProdCtrl = require('../controllers/produit');

// router.post('/', ProdCtrl.createProduit)
router.get('/:id', ProdCtrl.getOneProduct)
router.get('/', ProdCtrl.getAllProduits)

module.exports = router;