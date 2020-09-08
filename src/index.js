const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');
const animexyz = require('./anime-xyz/search');
const utils = require('./utils');

module.exports = {
	links: async (search, options = {}) => {
		let rsl = [];
		rsl = [...rsl, ...await animeland.search(search, options)];
		rsl = [...rsl, ...await chiaanime.search(search, options)];
		rsl = [...rsl, ...await animexyz.search(search, options)];
		rsl.sort(utils.compare_by_levenshtein);
		rsl = utils.apply_options(rsl, options);
		return rsl;
	}
};
