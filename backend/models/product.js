
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
   Team1: String,
   Team2: String,
   Name: String,
   IsVoted: Boolean,
   IsTeam1: Boolean,
   IsTeam2: Boolean
});

// Return model
module.exports = restful.model('Products', productSchema);