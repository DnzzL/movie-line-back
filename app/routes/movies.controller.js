const express = require('express');
const router = express.Router();
const apiService = require('../services/api.js');

router.post('/', getMovieList);

async function getMovieList(req, res) {
  const title = req.body.title;
  let movieList = [];
  try {
    movieList = await apiService.searchTitles(title);
  } catch (error) {
    let err = new Error(`could not find any movie: ${error}`);
    res.status(403).send(err.message);
  }
  res.send(movieList);
}

module.exports = router;
