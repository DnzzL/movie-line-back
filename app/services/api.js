const OS = require('opensubtitles-api');
const imdb = require('imdb-api');

async function searchTitles(searchText) {
  return await imdb.search(
    { name: searchText },
    { apiKey: process.env.IMDB_API_KEY }
  );
}

async function queryOpenSubtitles(language, imdbId) {
  const OpenSubtitles = new OS({
    useragent: process.env.OPEN_SUBTITLES_USER_AGENT,
    username: process.env.OPEN_SUBTITLES_USERNAME,
    password: process.env.OPEN_SUBTITLES_PASSWORD,
    ssl: true
  });

  await OpenSubtitles.search({
    sublanguageid: language,
    extensions: ['srt'],
    imdbid: imdbId
  });
}

module.exports = {
  searchTitles,
  queryOpenSubtitles
};
