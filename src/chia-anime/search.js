const utils = require('../utils');
const constants_global = require('../constants_global');
const constants = require('./constants');

module.exports = {
	search: async search => {
		const source = await utils.url_to_source(constants.URL_SEARCH + search);
		const doc = utils.source_to_dom(source);
		return module.exports.scrap_link(doc);
	},
	scrap_link: doc => {
		const elements = [...doc.querySelectorAll('div div a')];
		const objects_scrapped = elements.map((element, index) => {
			const object_scrapped = {};
			object_scrapped.title = element.innerHTML ? element.innerHTML : constants_global.NO_DATA;
			object_scrapped.link = element.getAttribute('href') ? element.getAttribute('href') : constants_global.NO_DATA;
			return object_scrapped;
		});
		return objects_scrapped;
	}
};
