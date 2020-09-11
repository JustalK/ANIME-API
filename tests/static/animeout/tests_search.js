const test = require('ava');
const m = require('../../../src');
const nock = require('nock');

/**
* Mock the call to the url for always having the same result even if pornhub website evolve (New comments...)
**/
const scope = nock('https://www.animeout.xyz')
	.get('/?s=mock%20anime%20api')
	.times(3)
	.replyWithFile(200, './tests/static/animeout/animeout_search.html');

test('[STATIC] Testing the search on the saved page of ANIMEOUT', async t => {
	const links = await m.links('mock anime api', {website: 'ANIMEOUT'});

	t.assert(links.length === 16);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Project Lists');
	t.is(links[0].link, 'https://www.animeout.xyz/projects-list/');
	t.is(links[0].levenshtein, 13);

	t.is(links[1].source, 'ANIMEOUT');
	t.is(links[1].title, 'Naruto Shippuden The Movie 1');
	t.is(links[1].link, 'https://www.animeout.xyz/naruto-shippuuden-the-movie-1/');
	t.is(links[1].levenshtein, 23);

	t.is(links[2].source, 'ANIMEOUT');
	t.is(links[2].title, 'Naruto Shippuuden (Latest Ep-500)');
	t.is(links[2].link, 'https://www.animeout.xyz/download-naruto-shippuuden/');
	t.is(links[2].levenshtein, 27);

	t.is(links[3].source, 'ANIMEOUT');
	t.is(links[3].title, 'Naruto Shippuden Movie 2 – Bonds');
	t.is(links[3].link, 'https://www.animeout.xyz/naruto-shippuden-movie-2/');
	t.is(links[3].levenshtein, 27);
});

test('[STATIC] Testing the options limit_per_website', async t => {
	const links = await m.links('mock anime api', {website: 'ANIMEOUT', limit_per_website: 1});

	t.assert(links.length === 1);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Project Lists');
	t.is(links[0].link, 'https://www.animeout.xyz/projects-list/');
	t.is(links[0].levenshtein, 13);
});

test('[STATIC] Testing the options limit', async t => {
	const links = await m.links('mock anime api', {website: 'ANIMEOUT', limit: 2});

	t.assert(links.length === 2);
	t.is(links[0].source, 'ANIMEOUT');
	t.is(links[0].title, 'Project Lists');
	t.is(links[0].link, 'https://www.animeout.xyz/projects-list/');
	t.is(links[0].levenshtein, 13);

	t.is(links[1].source, 'ANIMEOUT');
	t.is(links[1].title, 'Naruto Shippuden The Movie 1');
	t.is(links[1].link, 'https://www.animeout.xyz/naruto-shippuuden-the-movie-1/');
	t.is(links[1].levenshtein, 23);
});
