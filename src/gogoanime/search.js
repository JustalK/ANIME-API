const utils = require('../utils');
const libs = require('../global/search');
const constants_global = require('../constants_global');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async (search, options) => {
		return libs.search(constants_global.WEBSITE.GOGOANIME, constants.URL_SEARCH, search, options, module.exports.scrap_link);
	},
	scrap_link: (doc, search) => {
		return libs.scrap_link(constants_global.WEBSITE.GOGOANIME, '.main_body .last_episodes ul li .name a', {BRACKET: true}, doc, search);
	},
	scrap_stream: (doc, episode) => {
		const elements = [...doc.querySelectorAll('#episodes li a')];
		const object_stream = elements.find(element => element.innerHTML.trim() === 'EP ' + episode);
		const object_scrapped = {};
		object_scrapped.source = constants.NAME;
		object_scrapped.link = constants.URL_BASE + object_stream.getAttribute('href');
		return object_scrapped;
	},
	stream: async (search, episode, options) => {
		if (options.website && !options.website.includes(constants_global.WEBSITE.ANIMELAND)) {
			return [];
		}

		const search_best_one = await module.exports.search(search, {limit_per_website: 1});
		const source = await utils.url_to_cloudflare_source(constants.URL_BASE + search_best_one[0].link, '#episodes li a');
		if (source !== null) {
			const doc = utils.source_to_dom(source);
			const object_stream = module.exports.scrap_stream(doc, episode);
			return object_stream;
		}

		return [];
	}
};
