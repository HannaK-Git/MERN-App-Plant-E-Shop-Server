const { Schema, model } = require("mongoose");

const Rating = new Schema({
  rate: [{ type: String }],
  user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  device_id: [{ type: Schema.Types.ObjectId, ref: "Device" }],
});

module.exports = model("Rating", Rating);
