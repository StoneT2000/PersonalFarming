const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
connectDB();

app.get('/test', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/web/public/index.html'));
});
