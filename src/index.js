const animeland = require('./animeland/search');

module.exports = {
	links: async search => {
		return animeland.search(search);
	}
};
