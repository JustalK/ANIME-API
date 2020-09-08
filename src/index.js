const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');

module.exports = {
	links: async search => {
		let rsl = [];
		rsl = [...rsl, ...await animeland.search(search)];
		rsl = [...rsl, ...await chiaanime.search(search)];
		console.log(rsl);
		return rsl;
	}
};
