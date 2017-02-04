const mongoose = require('mongoose');
var typeSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('type', typeSchema);