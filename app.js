'use strict';

const express = require('express');
const morgan = require('morgan');
const { json } = require('express/lib/response');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the Server Side!',
    app: 'Create Character App',
  });
});

app.post('/', (req, res) => {
  res.send('you can post to this endpoint.');
});

app.get('/api/v1/chars', (req, res) => {});

module.exports = app;
