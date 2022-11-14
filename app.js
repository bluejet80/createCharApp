'use strict';

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const { json } = require('express/lib/response');

const app = express();

app.use(express.json());

// get data

const character = JSON.parse(
  fs.readFileSync(`${__dirname}/data/characters.json`)
);

// routes

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the Server Side!',
    app: 'Create Character App',
  });
});

app.post('/', (req, res) => {
  res.send('you can post to this endpoint.');
});

app.get('/api/v1/chars', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: character.length,
    data: { character },
  });
});

app.post('/api/v1/chars', (req, res) => {
  console.log(req.body);
  res.send('Done');
});

// export

module.exports = app;
