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
  // console.log(req.body);
  const newID = character[character.length - 1].id + 1;
  const newChar = Object.assign({ id: newID }, req.body);

  character.push(newChar);

  fs.writeFile(
    `${__dirname}/data/characters.json`,
    JSON.stringify(character),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newChar,
        },
      });
    }
  );
});

app.get('/api/v1/chars/:id', (req, res) => {
  const id = req.params.id * 1;
  const curChar = character.find((el) => el.id === id);

  if (!curChar) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { curChar },
  });
});

/// Patch Req

app.patch('/api/v1/chars/:id', (req, res) => {
  const id = req.params.id * 1;
  const update = req.body;
  console.log(req.body);
  const keys = Object.keys(update);
  keys.forEach((item) => {
    character[id - 1][item] = update[item];
  });

  fs.writeFile(
    `${__dirname}/data/characters.json`,
    JSON.stringify(character),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: character[id - 1],
      });
    }
  );
});

// export

module.exports = app;
