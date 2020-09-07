const utils = require('../utils');
const constants = require('./constants');

module.exports = {
	search: async (search) => {
		const source = await utils.url_to_source(constants.URL_SEARCH + search);
		const doc = utils.source_to_dom(source);
		module.exports.scrap_link(doc);
	},
	scrap_link: (doc) => {
		const elements = [...doc.querySelectorAll('.video_thumb_content .imagelist .title a')];
		const object_scrapped = elements.map((element, index) => {
			title = element.innerHTML ? element.innerHTML : 'No Data';
			link = element.getAttribute('href') ? element.getAttribute('href') : 'No Data';
			return {title: title, link: link}
		});
		return object_scrapped;
	}
};
