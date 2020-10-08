const utils = require('../utils');
const libs = require('../global/search');
const constants_global = require('../constants_global');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async (search, options) => {
		return libs.search(constants_global.WEBSITE.NINEANIME, constants.URL_SEARCH, search, options, module.exports.scrap_link, true, '+');
	},
	scrap_link: (doc, search) => {
		return libs.scrap_link(constants_global.WEBSITE.NINEANIME, '.anime-list .name', {BRACKET: true, EM: true}, doc, search);
	}
};
