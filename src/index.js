const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');
const animeout = require('./animeout/search');
const gogoanime = require('./gogoanime/search');
const animefreak = require('./animefreak/search');
const animeheight = require('./animeheight/search');
const utils = require('./utils');

module.exports = {
	links: async (search, options = {}) => {
		const promises = [];
		const stream_animeland = animeland.search(search, options);
		const stream_chiaanime = chiaanime.search(search, options);
		const stream_animeout = animeout.search(search, options);
		const stream_gogoanime = gogoanime.search(search, options);
		const stream_animefreak = animefreak.search(search, options);
		const stream_animeheight = animeheight.search(search, options);
		promises.push(stream_animeland);
		promises.push(stream_chiaanime);
		promises.push(stream_animeout);
		promises.push(stream_gogoanime);
		promises.push(stream_animefreak);
		promises.push(stream_animeheight);
		let rsl = await Promise.all(promises);
		rsl = rsl.flat();
		rsl.sort(utils.compare_by_levenshtein);
		rsl = utils.apply_options(rsl, options);
		return rsl;
	},
	stream: async (search, episode, options = {}) => {
		const promises = [];
		const stream_animeland = animeland.stream(search, episode, options);
		const stream_chiaanime = chiaanime.stream(search, episode, options);
		const stream_gogoanime = gogoanime.stream(search, episode, options);
		promises.push(stream_animeland);
		promises.push(stream_chiaanime);
		promises.push(stream_gogoanime);
		let rsl = await Promise.all(promises);
		// Removing the empty result
		rsl = rsl.filter(link => link);
		return rsl;
	},
	download: async (search, episode, options = {}) => {
		const promises = [];
		const stream_chiaanime = chiaanime.download(search, episode, options);
		promises.push(stream_chiaanime);
		let rsl = await Promise.all(promises);
		// Removing the empty result
		rsl = rsl.filter(link => link);
		return rsl;
	}
};
