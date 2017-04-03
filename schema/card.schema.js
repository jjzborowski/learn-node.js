const mongoose = require('mongoose'),
      collection_name = 'card',
      schema = mongoose.Schema({
          name: {
              type: mongoose.Schema.Types.Mixed //because regex
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

module.exports.getItemsByArtist = (req, res)=>{
    model.find({
        artist: req.params.artist
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemsByColor = (req, res)=>{
    model.find({
        color: req.params.color
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemsByExpansion = (req, res)=>{
    model.find({
        expansion: req.params.expansion
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemsByRarity = (req, res)=>{
    model.find({
        rarity: req.params.rarity
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemsBySubtype = (req, res)=>{
    model.find({
        subtype: req.params.subtype
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItemsByType = (req, res)=>{
    model.find({
        type: req.params.type
    }).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getItem = (req, res)=>{
    console.log(req.body);
    let data = req.body,
        conditions = {};

    if(data.name){
        let name = data.name,
            and = '',
            or = '',
            not = '';
        for(let i in name){
            switch(name[i].mode){
                case 0: {
                    and += '(?=.*' + name[i].value + ')';
                }; break;
                case 1: {
                    console.log(or);
                    or += ((or !== '') ? '|' : '') + '(?=.*' + name[i].value + ')';
                }; break;
                case 2: {
                    not += '(?!.*' + name[i].value + ')'
                }; break;
                               }
        }
        
        conditions['name'] = {$regex: and + '(' + or + ')' + not, $options: 'i'};
    }

    console.log(conditions);

    model.find(
        conditions
//        {'name': {$regex: '(?=.*Elf)((?=.*oo)|(?=.*ll))(?!.*ll)', $options: 'i'}}
    ).exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });

    //        model.find(
    //            {'name': {$all: [/Elf/i], $in: [/oo/i, /ll/i], $nin: [/ll/i]}}
    //        ).exec((err, result)=>{
    //            if(err){
    //                res.send(err);
    //            } else {
    //                res.json(result);
    //            }
    //        });
};

module.exports.addItem = (req, res)=>{
    console.log(req.body);
    let input = req.body;
    model.collection.insert(
        input
    );
};