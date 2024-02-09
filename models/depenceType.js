var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var depenseType = new Schema({
    nomDepense : {  type: String, required: true },
});

module.exports = mongoose.model('DepenseType',  depenseType);