const fetch = require('node-fetch');
const parser = require('subtitles-parser');

async function subtitlesToBuffer(url) {
  const fetched = await fetch(url);
  const buffer = await fetched.buffer();
  return buffer.toString('utf8');
}

async function getSubtitles(languageCode, subtitles) {
  let srt = '';
  try {
    srt = await subtitlesToBuffer(subtitles[languageCode][0].url);
  } catch (error) {
    throw error;
  }
  return parser.fromSrt(srt);
}

module.exports = {
  subtitlesToBuffer,
  getSubtitles,
};
