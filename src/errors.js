const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
	new winston.transports.Console({format: winston.format.simple()})
  ],
});

module.exports = {
	ERROR_WRONG_STATUS_CODE: 'The url return a wrong status code. Maybe the website is down for the moment.',
	ERROR_SEARCH_EMPTY: 'The mandatory search parameter is empty.',
	handle_error: (message, details = undefined) => {
		const error = {};
		logger.info(message);
		if (details) {
			logger.info(details);
		}
	}
};
