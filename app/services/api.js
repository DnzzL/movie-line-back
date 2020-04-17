const OS = require('opensubtitles-api');

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
  queryOpenSubtitles
};
