require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/movieInfo/:inputValue', (req, res) => {
  axios({
    url: `http://omdbapi.com/?s=${req.params.inputValue}&apikey=${process.env.OMDB_API_KEY}`,
    method: 'get'
  })
  .then((response) => {
    res.send(response.data);
  });
});

app.get('/movie/:id', (req, res) => {
  axios({
    url: `http://omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`,
    method: 'get'
  })
  .then((response) => {
    res.send(response.data);
  })
})

module.exports = app;
