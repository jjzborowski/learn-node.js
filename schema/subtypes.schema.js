const mongoose = require('mongoose'),
      subtypeSchema = mongoose.Schema({
          name: String
      }),
      subtypes = module.exports = mongoose.model('subtypes', subtypeSchema);

module.exports.getSubtypes = (req, res) => {
    subtypes.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};