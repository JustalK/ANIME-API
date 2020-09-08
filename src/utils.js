const errors = require('./errors');
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
	url_to_source: async url => {
		const safe_url = url.toLowerCase();
		try {
			const response = await got(safe_url);
			return response.body;
		} catch {
			return errors.handle_error(errors.ERROR_WRONG_STATUS_CODE, {url: safe_url});
		}
	},
	source_to_dom: source => {
		const dom = new JSDOM(source);
		return dom.window.document;
	},
	search: async (anime_search_link, search) => {
		if (search === '') {
			return errors.handle_error(errors.ERROR_SEARCH_EMPTY);
		}

		let search_encoded = search.trim().toLowerCase();
		search_encoded = encodeURI(search_encoded);
		const source = await module.exports.url_to_source(anime_search_link + search_encoded);
		return module.exports.source_to_dom(source);
	},
	clean_title: (title, clean_option) => {
		if (clean_option.TV) {
			title = title.replace('(TV)', '');
		}

		if (clean_option.OVA) {
			title = title.replace('(OVA)', '');
		}

		title = title.trim();
		return title;
	},
	apply_options: (objects, options) => {
		if (options.limit_per_website) {
			objects = objects.slice(0, options.limit_per_website);
		}

		if (options.limit) {
			objects = objects.slice(0, options.limit);
		}

		return objects;
	},
	compare_by_levenshtein: (a, b) => {
		if (a.levenshtein > b.levenshtein) {
			return 1;
		}

		if (b.levenshtein > a.levenshtein) {
			return -1;
		}

		return 0;
	}
};
