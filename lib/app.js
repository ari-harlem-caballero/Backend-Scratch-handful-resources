const express = require('express');
const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/songs', require('./controllers/songs'));
app.use('/api/v1/bobs', require('./controllers/bobs'));
app.use('/api/v1/charcuteries', require('./controllers/charcuteries'));
app.use('/api/v1/plants', require('./controllers/plants'));
app.use('/api/v1/tvshows', require('./controllers/tvshows'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
