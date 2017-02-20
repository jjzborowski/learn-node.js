const mongoose = require('mongoose'),
      raritySchema = mongoose.Schema({
          name: String
      }),
      rarities = module.exports = mongoose.model('rarity', raritySchema);

module.exports.getRarities = (req, res) => {
    rarities.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};