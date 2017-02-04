const mongoose = require('mongoose');
var colorSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('color', colorSchema);