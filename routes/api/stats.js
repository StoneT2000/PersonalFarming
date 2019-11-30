const express = require('express');
const router = express.Router();

const PlantStats = require('../../models/PlantStats.js');
router.get("/replacewater", (req, res) => {
  PlantStats.find({key: req.query.key}).sort({$natural:-1}).limit(10)
    .then( (stats) => {
      let waterLevelAverage = 0;
      stats.forEach( (stat) => {
        waterLevelAverage += stat.waterLevel.bytes.readUInt8();
      })
      waterLevelAverage/= stats.length;
      res.status(200).json({waterLevelAverage: waterLevelAverage})
    });
})

router.get("/aggregate", (req, res) => {
  PlantStats.find({key: req.query.key}).sort({$natural:-1}).limit(604800)
    .then( (stats) => {
      let temperatureAvg = 0;
      let lightAvg = 0;
      let soilMoistureAvg = 0;
      stats.forEach( (stat) => {
        temperatureAvg += stat.temperature.bytes.readUInt8();
        lightAvg += stat.light.bytes.readUInt8();
        soilMoistureAvg += stat.soilMoisture.bytes.readUInt8();
      })
      temperatureAvg/= stats.length;
      lightAvg/= stats.length;
      soilMoistureAvg/= stats.length;
      res.status(200).json({temperatureAvg: temperatureAvg, soilMoistureAvg: soilMoistureAvg, lightAvg: lightAvg})
    });
})

module.exports = router;
