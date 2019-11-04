const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const User = require('../../models/User.js');

router.get('/login', (req, res) => {
  console.log(req.query)
  if (!req.query.username) {
    res.status(400).json({error: "Unable to find user"});
  }
  if (!req.query.password) {
    req.status(400).json({error: "Missing passsword"});
  }
  User.find({username: req.query.username})
  .then(users => {
    console.log(users);
    /*Unique? */
    if (users[0] && bcrypt.compareSync(req.query.password, users[0].password)) {
      res.json({msg: 'User logged in successfully'});
    }
    else {
      res.status(400).json({ error: 'Incorrect Password or Username' });
    }
  })
  .catch(err => res.status(400).json({ error: 'Unable to login' }));
});

router.post('/register', (req, res) => {
  let userData = req.body;
  console.log(userData);
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  console.log(userData);
  User.create(userData)
  .then(data => res.json({ msg: 'User registered successfully' }))
  .catch(err => res.status(400).json({ error: 'Unable to register this new user' }));
});

module.exports = router;
