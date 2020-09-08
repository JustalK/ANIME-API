module.exports = {
	ERROR_WRONG_STATUS_CODE: 'The url return a wrong status code. Maybe the website is down for the moment.',
	ERROR_SEARCH_EMPTY: 'The mandatory search parameter is empty.',
	handle_error: (message, details = undefined) => {
		const error = {message: message};
		if (details) {
			error.details = details
		}

		throw error;
	}
};
