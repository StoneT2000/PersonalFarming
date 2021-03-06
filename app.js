const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

connectDB();
const recordAPI = require('./routes/api/record');
app.use("/api/record", recordAPI);

const authAPI = require('./routes/api/auth');
app.use("/api/auth", authAPI);

const statsAPI = require('./routes/api/stats');
app.use("/api/stats", statsAPI);

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'web/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'web/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
