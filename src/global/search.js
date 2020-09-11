const utils = require('../utils');
const constants_global = require('../constants_global');
const levenshtein = require('js-levenshtein');

module.exports = {
	search: async (website, url, search, options, fn) => {
		if (options.website && !options.website.includes(website)) {
			return [];
		}
		const doc = await utils.search(url, search);
		if (doc !== null) {
			const objects_scrapped = fn(doc, search);
			const objects_scrapped_optionned = utils.apply_options(objects_scrapped, options);
			return objects_scrapped_optionned;
		}

		return [];
	},
	scrap_link: (website, selector_all, clean_title, doc, search) => {
		const elements = [...doc.querySelectorAll(selector_all)];
		const objects_scrapped = elements.map((element, index) => {
			const object_scrapped = {};
			object_scrapped.source = website;
			object_scrapped.title = element.innerHTML ? element.innerHTML : constants_global.GLOBAL_NO_DATA;
			object_scrapped.title = utils.clean_title(object_scrapped.title, clean_title);
			object_scrapped.link = element.getAttribute('href') ? element.getAttribute('href') : constants_global.GLOBAL_NO_DATA;
			object_scrapped.levenshtein = object_scrapped.title === constants_global.GLOBAL_NO_DATA ? constants_global.GLOBAL_MAX_LEVEINSTEIN : levenshtein(object_scrapped.title, search);
			return object_scrapped;
		});
		objects_scrapped.sort(utils.compare_by_levenshtein);
		return objects_scrapped;
	}
};
