const got = require('got');

module.exports = {
	url_to_source: async url => {
		const safe_url = url.toLowerCase();
		const response = await got(safe_url);
		console.log(response);
		return response.body;
	}
};
