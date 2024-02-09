var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var depensesExtra = new Schema({
    depenseTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepenseType' 
    },
    date : {  type: Date, required: true },
    description : {  type: String, required: true },
    montant : {  type: Number, required: true },
});

module.exports = mongoose.model('DepensesExtra',  depensesExtra);