const mongoose = require('mongoose'),
      artistSchema = mongoose.Schema({
          name: String
      }),
      artists = module.exports = mongoose.model('artist', artistSchema);

module.exports.getArtists = (req, res) => {
    artists.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};