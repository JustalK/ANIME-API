const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
	url_to_source: async url => {
		const safe_url = url.toLowerCase();
		const response = await got(safe_url);
		return response.body;
	},
	source_to_dom: source => {
		const dom = new JSDOM(source);
		return dom.window.document;
	},
	search: async (anime_search_link, search) => {
		let search_encoded = search.trim().toLowerCase();
		search_encoded = encodeURI(search_encoded);
		const source = await module.exports.url_to_source(anime_search_link + search_encoded);
		return module.exports.source_to_dom(source);
	}
};
