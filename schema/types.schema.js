const mongoose = require('mongoose'),
      typeSchema = mongoose.Schema({
          name: String
      }),
      types = module.exports = mongoose.model('type', typeSchema);

module.exports.getTypes = (req, res) => {
    types.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};