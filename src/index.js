const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');
const animeout = require('./animeout/search');
const utils = require('./utils');

module.exports = {
	links: async (search, options = {}) => {
		let rsl = [];
		rsl = [...rsl, ...await animeland.search(search, options)];
		rsl = [...rsl, ...await chiaanime.search(search, options)];
		rsl = [...rsl, ...await animeout.search(search, options)];
		rsl.sort(utils.compare_by_levenshtein);
		rsl = utils.apply_options(rsl, options);
		return rsl;
	},
	stream: async (search, episode, options = {}) => {
		const rsl = [];
		rsl.push(await animeland.stream(search, episode, options));
		return rsl;
	}
};
