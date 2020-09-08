const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');

module.exports = {
	links: async search => {
		const rsl = {};
		rsl.animeland = await animeland.search(search);
		rsl.chiaanime = await chiaanime.search(search);
		console.log(rsl);
		return rsl;
	}
};
