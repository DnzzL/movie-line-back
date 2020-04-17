const Fuse = require('fuse.js');

function searchBestSubtitles(data, replica) {
  const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.8,
    location: 0,
    distance: 100,
    keys: ['text']
  };

  const fuse = new Fuse(data, options);
  return fuse.search(replica, { limit: 3 });
}

function extractSurroundingContext(data, replica) {
  const bestSubtitles = searchBestSubtitles(data, replica);
  if (!bestSubtitles || bestSubtitles.length === 0) {
    return [];
  }

  const bestSubtitleId = +bestSubtitles[0].item.id;
  return data.filter(
    d => bestSubtitleId - 5 <= +d.id && +d.id <= bestSubtitleId + 5
  );
}

module.exports = {
  extractSurroundingContext
};
