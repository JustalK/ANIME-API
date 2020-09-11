const utils = require('../utils');
const libs = require('../global/search');
const constants_global = require('../constants_global');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async (search, options) => {
		return libs.search(constants_global.WEBSITE.ANIMEFREAK, constants.URL_SEARCH, search, options, module.exports.scrap_link, false);
	},
	scrap_link: (doc, search) => {
		const json = JSON.parse(doc);
		const elements = json.data;
		const objects_scrapped = elements.map((element, index) => {
			const object_scrapped = {};
			object_scrapped.source = constants.NAME;
			object_scrapped.title = element.name ? element.name : constants_global.GLOBAL_NO_DATA;
			object_scrapped.title = utils.clean_title(object_scrapped.title, {});
			object_scrapped.link = element.seo_name ? constants.URL_PAGE + element.seo_name : constants_global.GLOBAL_NO_DATA;
			object_scrapped.levenshtein = object_scrapped.title === constants_global.GLOBAL_NO_DATA ? constants_global.GLOBAL_MAX_LEVEINSTEIN : levenshtein(object_scrapped.title, search);
			return object_scrapped;
		});
		objects_scrapped.sort(utils.compare_by_levenshtein);
		return objects_scrapped;
	}
};
