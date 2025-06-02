const Charger = require("../models/charger");

exports.getChargers = async (req, res) => {
  const filters = {};
  if (req.query.status) filters.status = req.query.status;
  if (req.query.connector) filters.connector = req.query.connector;
  try {
    const chargers = await Charger.find(filters);
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chargers" });
  }
};

exports.addCharger = async (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const power = req.body.power;
    const connector = req.body.connector;
    const lat = req.body.lat;
    const lng = req.body.lng;
    if (!name || !status || !power || !connector || lat === undefined || lng === undefined) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

  try {
    const newCharger = await Charger.create({
        name,
        status,
        power,
        connector,
        lat,
        lng
    }); 
    return res.status(200).json(newCharger);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

exports.updateCharger = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Charger ID is required" });
    }
    
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(charger);
  } catch (err) {
    res.status(400).json({ error: "Failed to update" });
  }
};

exports.deleteCharger = async (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    if (!id) {
        return res.status(400).json({ error: "Charger ID is required" });
    }
  try {
    const result=await Charger.findByIdAndDelete({_id: id});
    console.log(result);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Delete failed" });
  }
};

