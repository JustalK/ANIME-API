const utils = require('../utils');
const constants_global = require('../constants_global');
const constants = require('./constants');
const levenshtein = require('js-levenshtein');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
	search: async (search, options) => {
		if (options.website && !options.website.includes(constants_global.WEBSITE.ANIMELAND)) {
			return [];
		}

		const doc = await utils.search(constants.URL_SEARCH, search);
		if (doc !== null) {
			const objects_scrapped = module.exports.scrap_link(doc, search);
			const objects_scrapped_optionned = utils.apply_options(objects_scrapped, options);
			return objects_scrapped_optionned;
		}
		
		return [];
	},
	stream: async (search, episode, options) => {
		if (options.website && !options.website.includes(constants_global.WEBSITE.ANIMELAND)) {
			return [];
		}

		const search_best_one = await module.exports.search(search, {limit_per_website: 1});
		const source = await utils.url_to_cloudflare_source(search_best_one[0].link);
		if (source !== null) {
			const doc = utils.source_to_dom(source);
			const object_stream = module.exports.scrap_stream(doc, episode);
			return object_stream;
		}
		return [];
	},
	scrap_link: (doc, search) => {
		const elements = [...doc.querySelectorAll('.video_thumb_content .imagelist .title a')];
		const objects_scrapped = elements.map((element, index) => {
			const object_scrapped = {};
			object_scrapped.source = constants.NAME;
			object_scrapped.title = element.innerHTML ? element.innerHTML : constants_global.GLOBAL_NO_DATA;
			object_scrapped.title = utils.clean_title(object_scrapped.title, {TV: true});
			object_scrapped.link = element.getAttribute('href') ? element.getAttribute('href') : constants_global.GLOBAL_NO_DATA;
			object_scrapped.levenshtein = object_scrapped.title === constants_global.GLOBAL_NO_DATA ? constants_global.GLOBAL_MAX_LEVEINSTEIN : levenshtein(object_scrapped.title, search);
			return object_scrapped;
		});
		objects_scrapped.sort(utils.compare_by_levenshtein);
		return objects_scrapped;
	},
	scrap_stream: (doc, episode) => {
		const elements = [...doc.querySelectorAll('.video_thumb_content .anime-col li a')];
		const object_stream = elements.find(element => element.innerHTML == 'Episode '+episode);
		const object_scrapped = {};
		object_scrapped.source = constants.NAME;
		object_scrapped.link = object_stream.getAttribute('href');
		return object_scrapped;
	}
};
