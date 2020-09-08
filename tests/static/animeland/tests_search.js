const test = require('ava');
const m = require('../../../src');
const nock = require('nock');

/**
* Mock the call to the url for always having the same result even if pornhub website evolve (New comments...)
**/
const scope = nock('https://www.animeland.us')
	.get('/?s=mock%20anime%20api')
	.times(3)
	.replyWithFile(200, './tests/static/animeland/animeland_search.html');

test('[STATIC] Testing the search on the saved page of ANIMELAND', async t => {
	const links = await m.links('mock anime api');

	t.assert(links.length === 7);
	t.is(links[0].source, 'ANIMELAND');
	t.is(links[0].title, 'Naruto');
	t.is(links[0].link, 'https://www.animeland.us/dub/naruto');
	t.is(links[0].levenshtein, 13);

	t.is(links[1].source, 'ANIMELAND');
	t.is(links[1].title, 'Naruto Shippuden');
	t.is(links[1].link, 'https://www.animeland.us/dub/naruto-shippuden');
	t.is(links[1].levenshtein, 14);

	t.is(links[2].source, 'ANIMELAND');
	t.is(links[2].title, 'Naruto Uncut Version');
	t.is(links[2].link, 'https://www.animeland.us/dub/naruto-uncut-version');
	t.is(links[2].levenshtein, 16);

	t.is(links[6].source, 'ANIMELAND');
	t.is(links[6].title, 'No Data');
	t.is(links[6].link, 'No Data');
	t.is(links[6].levenshtein, 1337);
});

test('[STATIC] Testing the options limit_per_website', async t => {
	const links = await m.links('mock anime api', {limit_per_website: 1});

	t.assert(links.length === 1);
	t.is(links[0].source, 'ANIMELAND');
	t.is(links[0].title, 'Naruto');
	t.is(links[0].link, 'https://www.animeland.us/dub/naruto');
	t.is(links[0].levenshtein, 13);
});

test('[STATIC] Testing the options limit', async t => {
	const links = await m.links('mock anime api', {limit: 2});

	t.assert(links.length === 2);
	t.is(links[0].source, 'ANIMELAND');
	t.is(links[0].title, 'Naruto');
	t.is(links[0].link, 'https://www.animeland.us/dub/naruto');
	t.is(links[0].levenshtein, 13);

	t.is(links[1].source, 'ANIMELAND');
	t.is(links[1].title, 'Naruto Shippuden');
	t.is(links[1].link, 'https://www.animeland.us/dub/naruto-shippuden');
	t.is(links[1].levenshtein, 14);
});
