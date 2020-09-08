module.exports = {
	ERROR_WRONG_STATUS_CODE: 'The url return a wrong status code. Maybe the website is down for the moment.',
	handle_error: (message, details) => {
		throw {message: message, details: details}
	}
};
