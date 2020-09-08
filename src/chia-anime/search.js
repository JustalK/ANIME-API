const utils = require('../utils');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async search => {
		const doc = await utils.search(constants.URL_SEARCH, search);
		return module.exports.scrap_link(doc, search);
	},
	scrap_link: (doc, search) => {
		const elements = [...doc.querySelectorAll('div div a')];
		const objects_scrapped = elements.map((element, index) => {
			const object_scrapped = {};
			object_scrapped.source = constants.NAME;
			object_scrapped.title = element.innerHTML ? element.innerHTML : constants.GLOBAL_NO_DATA;
			object_scrapped.link = element.getAttribute('href') ? element.getAttribute('href') : constants.GLOBAL_NO_DATA;
			object_scrapped.levenshtein = levenshtein(object_scrapped.title, search);
			return object_scrapped;
		});
		return objects_scrapped;
	}
};
