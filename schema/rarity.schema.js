const mongoose = require('mongoose');
var raritySchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('rarity', raritySchema);