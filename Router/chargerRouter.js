const express = require('express');
const router = express.Router();

const {getChargers, addCharger, updateCharger, deleteCharger} = require('../Controller/Chargers');

router.get('/', getChargers); // Get all chargers with optional filters
router.post('/create-charger', addCharger); // Add a new charger
router.put('/update-charger/:id', updateCharger); // Update a charger by ID
router.delete('/delete-charger/:id', deleteCharger); // Delete a charger by ID

module.exports = router;