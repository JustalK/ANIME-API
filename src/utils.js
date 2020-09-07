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
	}
};
