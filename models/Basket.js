const {Schema, model} = require('mongoose')


const Basket = new Schema({
  password: { type: String },
  user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Basket", Basket);
