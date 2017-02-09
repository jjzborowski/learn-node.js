const mongoose = require('mongoose'),
      expansionSchema = mongoose.Schema({
          name: String
      }),
      expansions = module.exports = mongoose.model('expansion', expansionSchema);

module.exports.getExpansions = (req, res) => {
    expansions.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};