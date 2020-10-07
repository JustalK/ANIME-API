const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');
const animeout = require('./animeout/search');
const gogoanime = require('./gogoanime/search');
const animefreak = require('./animefreak/search');
const animeheight = require('./animeheight/search');
const utils = require('./utils');

module.exports = {
	links: async (search, options = {}) => {
		const directories = utils.get_website_from_directory('./src/');
		const search_paths = utils.get_search_path_for_directories(directories);
		const promises = search_paths.map(search_path => {
			const website = require(search_path);
			return website.search(search, options);
		});
		let rsl = await Promise.all(promises);
		rsl = rsl.flat();
		rsl.sort(utils.compare_by_levenshtein);
		rsl = utils.apply_options(rsl, options);
		return rsl;
	},
	stream: async (search, episode, options = {}) => {
		const promises = [];
		const stream_animeland = animeland.stream(search, episode, options);
		const stream_chiaanime = chiaanime.stream(search, episode, options);
		const stream_gogoanime = gogoanime.stream(search, episode, options);
		promises.push(stream_animeland);
		promises.push(stream_chiaanime);
		promises.push(stream_gogoanime);
		let rsl = await Promise.all(promises);
		// Removing the empty result
		rsl = rsl.filter(link => link);
		return rsl;
	},
	download: async (search, episode, options = {}) => {
		const promises = [];
		const stream_chiaanime = chiaanime.download(search, episode, options);
		promises.push(stream_chiaanime);
		let rsl = await Promise.all(promises);
		// Removing the empty result
		rsl = rsl.filter(link => link);
		return rsl;
	}
};
