const test = require('ava');
const m = require('../../src');

test('[DYNAMIC] Testing the search on the daisuki website', async t => {
	const links = await m.links('naruto', {website: 'ANIMEDAISUKI'});

	t.assert(links.length > 0);
	t.is(links[0].source, 'ANIMEDAISUKI');
	t.is(links[0].title, 'Naruto');
	t.is(links[0].link, '/anime/343/naruto');
	t.is(links[0].levenshtein, 1);
});
