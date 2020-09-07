const utils = require('../utils');

module.exports = {
	search: async (search) => {
		return utils.url_to_source('https://www.animeland.us/?s=' + search);
	}
};
