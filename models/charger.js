const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["active", "inactive"] },
  power: Number,
  connector: { type: String, enum: ["Type 2", "CCS", "CHAdeMO"] },
  lat: Number,
  lng: Number,
});

const Charger = mongoose.model("Charger", chargerSchema);
module.exports = Charger;
