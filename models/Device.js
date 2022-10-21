const { Schema, model } = require("mongoose");




const Device = new Schema({
  name: { type: String, required: true },
  price: { type: String },
  info: [{ type: Schema.Types.ObjectId, ref: "DeviceInfo" }],
  img: { type: String },
  type_id: { type: Schema.Types.ObjectId, ref: "Type" },
  brand_id: { type: Schema.Types.ObjectId, ref: "Brand" },
});

module.exports = model("Device", Device);
