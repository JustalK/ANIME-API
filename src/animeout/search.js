const utils = require('../utils');
const libs = require('../global/search');
const constants_global = require('../constants_global');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async (search, options) => {
		return libs.search(constants_global.WEBSITE.ANIMEOUT, constants.URL_SEARCH, search, options, module.exports.scrap_link);
	},
	scrap_link: (doc, search) => {
		return libs.scrap_link(constants_global.WEBSITE.ANIMEOUT, '.template-page .post-content .post-title a', {TV: true}, doc, search);
	}
};
