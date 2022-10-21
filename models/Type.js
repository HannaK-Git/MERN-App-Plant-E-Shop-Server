const {Schema, model} = require('mongoose')


const Type = new Schema({
  name:  String 

});

module.exports = model("Type", Type);
