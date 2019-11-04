// models/Book.js

const mongoose = require('mongoose');

let PlantStatsSchema = new mongoose.Schema({
  humidity: {
    type: mongoose.Decimal128
  },
  soilMoisture: {
    type: mongoose.Decimal128
  },
  waterLevel: {
    type: mongoose.Decimal128
  },
  temperature: {
    type: mongoose.Decimal128
  },
  light: {
    type: mongoose.Decimal128
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  key: {
    type: String,
    required: true 
  }
});

module.exports = PlantStatsSchema = mongoose.model('plantStats', PlantStatsSchema);
