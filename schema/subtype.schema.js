const mongoose = require('mongoose'),
      collection_name = 'subtype',
      schema = mongoose.Schema({
          name: {
              type: String
          }
      }),
      model = module.exports = mongoose.model(collection_name, schema);

mongoose.Promise = global.Promise;

module.exports.getCollection = (req, res)=>{
    model.find({}).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemById = (req, res)=>{
    model.findOne({
        _id: req.params.id 
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};