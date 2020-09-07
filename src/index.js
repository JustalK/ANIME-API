const animeland = require('./animeland/search');

module.exports = {
	links: async (search) => {
		return await animeland.search(search);
	}
};
