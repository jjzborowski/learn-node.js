const mongoose = require('mongoose'),
      colorSchema = mongoose.Schema({
          name: String
      }),
      colors = module.exports = mongoose.model('color', colorSchema);

module.exports.getColors = (req, res) => {
    colors.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getColorById = (req, res) => {
    colors.findOne({
        _id: req.params.id 
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};