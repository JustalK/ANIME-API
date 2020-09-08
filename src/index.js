const animeland = require('./animeland/search');
const chiaanime = require('./chia-anime/search');

/**
* Compare by string difference
**/
const compare_by_levenshtein = (a, b) => {
  if (a.levenshtein > b.levenshtein) return 1;
  if (b.levenshtein > a.levenshtein) return -1;

  return 0;
}

module.exports = {
	links: async search => {
		let rsl = [];
		rsl = [...rsl, ...await animeland.search(search)];
		rsl = [...rsl, ...await chiaanime.search(search)];
		rsl.sort(compare_by_levenshtein);
		console.log(rsl);
		return rsl;
	}
};
