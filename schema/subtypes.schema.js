const mongoose = require('mongoose');
var subtypeSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('subtype', subtypeSchema);