const express = require('express');
const router = express.Router();
const apiService = require('../services/api.js');
const downloadService = require('../services/download.js');
const searchService = require('../services/search.js');

router.post('/', getReplica);

async function getReplica(req, res) {
  const imdbId = req.body.imdbId;
  const language = req.body.language;
  const replica = req.body.replica;

  await downloadService.subtitlesToBuffer(
    'https://dl.opensubtitles.org/en/download/src-api/vrf-198e0c4d/sid-8R5bq8I6A-5w,g3sYXgOfXVzgja/file/1955211129'
  );
  let queryResults = [];
  try {
    queryResults = await apiService.queryOpenSubtitles(language, imdbId);
  } catch (error) {
    let err = new Error(`could not find subtitles: ${error}`);
    res.status(403).send(err.message);
  }
  if (!queryResults) {
    let err = new Error('no results');
    res.status(403).send(err.message);
  }

  let data = [];
  try {
    data = await downloadService.getSubtitles(queryResults);
  } catch (error) {
    console.log('could not get subtitles: ', error);
  }

  let surroundings = [];
  try {
    surroundings = searchService.extractSurroundingContext(data, replica);
  } catch (error) {
    console.log('could not find replica: ', error);
  }
  res.send(surroundings);
}

module.exports = router;
