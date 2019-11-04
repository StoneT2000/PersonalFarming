const express = require('express');
const router = express.Router();

const PlantStats = require('../../models/PlantStats.js');

router.get('/test', (req, res) => res.send('Hey!'));

router.post('/', (req, res) => {
  console.log(req);
  PlantStats.create(req.body)
    .then(record => res.json({ msg: 'Plant record added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this plant record' }));
});

/* Retrieve data by ID, time frame etc. */
router.get('/:key', (req, res) => {
  console.log(req.params);
  PlantStats.find({key: req.params.key})
    .then(stats => res.json(stats))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

module.exports = router;
