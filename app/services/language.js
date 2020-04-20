const languages = require('country-data').languages;

function getAlpha2Code(name) {
  return languages.all.find((l) => l.name === name).alpha2;
}

function getAlpha3Code(name) {
  return languages.all.find((l) => l.name === name).alpha3;
}

module.exports = {
  getAlpha2Code,
  getAlpha3Code,
};
