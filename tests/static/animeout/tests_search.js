const test = require('ava');
const m = require('../../../src');
const nock = require('nock');

/**
* Mock the call to the url for always having the same result even if pornhub website evolve (New comments...)
**/
const scope = nock('https://www.animeout.xyz')
	.get('/?s=naruto%20shippuden')
	.times(3)
	.replyWithFile(200, './tests/static/animeout/animeout_search.html');

test('[STATIC] Testing the search on the saved page of ANIMEOUT', async t => {
	const links = await m.links('naruto shippuden', {website: 'ANIMEOUT'});

	console.log(links);
	t.assert(links.length === 16);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Naruto Shippuuden');
	t.is(links[0].link, 'https://www.animeout.xyz/download-naruto-shippuuden/');
	t.is(links[0].levenshtein, 3);

	t.is(links[1].source, 'ANIMEOUT');
	t.is(links[1].title, 'Naruto');
	t.is(links[1].link, 'https://www.animeout.xyz/naruto-2002originalcomplete/');
	t.is(links[1].levenshtein, 11);

	t.is(links[2].source, 'ANIMEOUT');
	t.is(links[2].title, 'Heroman');
	t.is(links[2].link, 'https://www.animeout.xyz/heroman-complete-batch-720p150mb/');
	t.is(links[2].levenshtein, 13);

	t.is(links[3].source, 'ANIMEOUT');
	t.is(links[3].title, 'Naruto Shippuden The Movie 1');
	t.is(links[3].link, 'https://www.animeout.xyz/naruto-shippuuden-the-movie-1/');
	t.is(links[3].levenshtein, 14);
});

test('[STATIC] Testing the options limit_per_website', async t => {
	const links = await m.links('naruto shippuden', {website: 'ANIMEOUT', limit_per_website: 1});

	t.assert(links.length === 1);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Naruto Shippuuden');
	t.is(links[0].link, 'https://www.animeout.xyz/download-naruto-shippuuden/');
	t.is(links[0].levenshtein, 3);
});

test('[STATIC] Testing the options limit', async t => {
	const links = await m.links('naruto shippuden', {website: 'ANIMEOUT', limit: 2});

	t.assert(links.length === 2);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Naruto Shippuuden');
	t.is(links[0].link, 'https://www.animeout.xyz/download-naruto-shippuuden/');
	t.is(links[0].levenshtein, 3);

	t.is(links[1].source, 'ANIMEOUT');
	t.is(links[1].title, 'Naruto');
	t.is(links[1].link, 'https://www.animeout.xyz/naruto-2002originalcomplete/');
	t.is(links[1].levenshtein, 11);
});
