const mongoose = require('mongoose');
var expansionSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('expansion', expansionSchema);