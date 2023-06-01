const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use the API routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
