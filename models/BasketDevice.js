const {Schema, model} = require('mongoose')


const BasketDevice = new Schema({
  basket_id: { type: Schema.Types.ObjectId, ref: "Basket" },
  device_id: [{ type: Schema.Types.ObjectId, ref: "Device" }],
});

module.exports = model("BasketDevice", BasketDevice);
