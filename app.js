const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
//connectDB();

app.get('/test', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 5000;

//app.use(express.static(path.join(__dirname, 'web/public')));
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'web/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'web/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
