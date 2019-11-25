const express = require('express');
const router = express.Router();

const PlantStats = require('../../models/PlantStats.js');

router.get('/test', (req, res) => res.send('Hey!'));

router.post('/', (req, res) => {
  let data = req.text;
  data = data.split("&");
  let serialized = {
    key: "Helloplants!"
  }
  for (let i = 0 ; i < data.length; i++) {
    let info = data[i].split("=");
    switch(info[0]) {
      case "light":
        serialized.light = info[1]
        break;
      case "water":
        serialized.waterLevel = info[1];
        break;
      case "temperature":
        serialized.temperature = info[1];
        break;
      case "moisture":
        serialized.soilMoisture = info[1];
        break;
      case "humidity":
        serialized.humidity = info[1];
        break;
      case "key":
        serialized.key = info[1];
        break;
    }
  }
  let pumpState = "off";
  if (serialized.soilMoisture <= 67) {
    pumpState = "on";
  }

  console.log(serialized);
  PlantStats.create(serialized)
    .then(record => res.send(pumpState))
    .catch(err => res.status(400).json({ error: 'Unable to add this plant record' }));
});

router.post('/togglepump', (req, res) => {
  res.json({pump: "on"});
})


/* Retrieve data by ID, time frame etc. */
router.get('/:key', (req, res) => {
  console.log(req.params);
  PlantStats.find({key: req.params.key}).sort({$natural:-1}).limit(40)
    .then(stats => res.status(200).json(stats))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

module.exports = router;
