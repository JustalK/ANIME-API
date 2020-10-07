const errors = require('./errors');
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const puppeteer = require('puppeteer');
const virtualConsole = new jsdom.VirtualConsole();
const fs = require('fs');

module.exports = {
	get_website_from_directory: path => {
		const everything = fs.readdirSync(path, {withFileTypes: true});
		const directories = everything.filter(files => files.isDirectory());
		const directories_name = directories.map(directory => directory.name);
		const directories_name_filtered = directories_name.filter(directory_name => directory_name !== 'global');
		return directories_name_filtered;
	},
	get_search_path_for_directory: directory_name => {
		return './' + directory_name + '/search';
	},
	get_search_path_for_directories: directories_name => {
		return directories_name.map(module.exports.get_search_path_for_directory);
	},
	url_to_source: async safe_url => {
		try {
			const response = await got(safe_url);
			return response.body;
		} catch {
			return errors.handle_error(errors.ERROR_WRONG_STATUS_CODE, {url: safe_url});
		}
	},
	url_to_cloudflare_source: async (url, waitForElement) => {
		const safe_url = url.toLowerCase();
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		try {
			await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
			await page.goto(safe_url);
			await page.waitForSelector(waitForElement, {visible: true, timeout: 30000});
			const response = await page.content();
			await page.close();
			await browser.close();
			return response;
		} catch {
			errors.handle_error(errors.ERROR_WRONG_STATUS_CODE, {url: safe_url});
			page.close();
			browser.close();
			return null;
		}
	},
	source_to_dom: source => {
		const dom = new JSDOM(source, {virtualConsole});
		return dom.window.document;
	},
	search: async (anime_search_link, search, dom = true, space = null) => {
		if (search === '') {
			errors.handle_error(errors.ERROR_SEARCH_EMPTY);
			return null;
		}

		let search_encoded = search.trim().toLowerCase();
		if (space) {
			search_encoded = search_encoded.replace(/\s/g, space);
		}

		search_encoded = encodeURI(search_encoded);
		const source = await module.exports.url_to_source(anime_search_link + search_encoded);
		return dom ? module.exports.source_to_dom(source) : source;
	},
	clean_title: (title, clean_option) => {
		if (clean_option.BRACKET) {
			title = title.replace(/\([^)]*\)/gi, '');
		}

		if (clean_option.EM) {
			title = title.replace(/<em>/gi, '');
			title = title.replace(/<\/em>/gi, '');
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
