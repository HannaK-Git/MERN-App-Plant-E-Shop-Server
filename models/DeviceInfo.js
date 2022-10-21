const { Schema, model } = require("mongoose");

const DeviceInfo = new Schema({
  // device_id: { type: Schema.Types.ObjectId, ref: "Device" },
  title: { type: String },
  description: { type: String },
});


module.exports = model("DeviceInfo", DeviceInfo);
