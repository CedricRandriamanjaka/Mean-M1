var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CompetenceSchema = new Schema({
    nomCompetence : {  type: String, required: true },
    services : {type : Schema.Types.ObjectId , ref : 'Service'},
});

module.exports = mongoose.model('Competence',  CompetenceSchema);