const test = require('ava');
const m = require('../../../src');
const nock = require('nock');

/**
* Mock the call to the url for always having the same result even if pornhub website evolve (New comments...)
**/
const scope = nock('http://www.chia-anime.me')
	.get('/mysearch.php?nocache&s=&search=mock%20anime%20api')
	.times(3)
	.replyWithFile(200, './tests/static/chia-anime/chia_anime_search.html');

test('[STATIC] Testing the search on the saved page of ANIMELAND', async t => {
	const links = await m.links('mock anime api');

	t.assert(links.length === 5);
	t.is(links[0].source, 'CHIA-ANIME');
	t.is(links[0].title, 'JoJo\'s Bizarre Adventure (OVA)');
	t.is(links[0].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure/');
	t.is(links[0].levenshtein, 24);

	t.is(links[1].source, 'CHIA-ANIME');
	t.is(links[1].title, 'JoJo\'s Bizarre Adventure Episode (OVA)');
	t.is(links[1].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure-episode/');
	t.is(links[1].levenshtein, 30);

	t.is(links[2].source, 'CHIA-ANIME');
	t.is(links[2].title, 'JoJo no Kimyou na Bouken: Ougon no Kaze (TV)');
	t.is(links[2].link, 'http://www.chia-anime.me/episode/jojo-no-kimyou-na-bouken-ougon-no-kaze/');
	t.is(links[2].levenshtein, 37);

	t.is(links[3].source, 'CHIA-ANIME');
	t.is(links[3].title, 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai (TV)');
	t.is(links[3].link, 'http://www.chia-anime.me/episode/jojo-no-kimyou-na-bouken-diamond-wa-kudakenai/');
	t.is(links[3].levenshtein, 42);

	t.is(links[4].source, 'CHIA-ANIME');
	t.is(links[4].title, 'JoJo\'s Bizarre Adventure: Stardust Crusaders 2nd Season (TV)');
	t.is(links[4].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure-stardust-crusaders-2nd-season/');
	t.is(links[4].levenshtein, 53);
});

test('[STATIC] Testing the options limit_per_website', async t => {
	const links = await m.links('mock anime api', {limit_per_website: 1});

	t.assert(links.length === 1);
	t.is(links[0].source, 'CHIA-ANIME');
	t.is(links[0].title, 'JoJo\'s Bizarre Adventure (OVA)');
	t.is(links[0].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure/');
	t.is(links[0].levenshtein, 24);
});

test('[STATIC] Testing the options limit', async t => {
	const links = await m.links('mock anime api', {limit: 2});

	t.assert(links.length === 2);
	t.is(links[0].source, 'CHIA-ANIME');
	t.is(links[0].title, 'JoJo\'s Bizarre Adventure (OVA)');
	t.is(links[0].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure/');
	t.is(links[0].levenshtein, 24);

	t.is(links[1].source, 'CHIA-ANIME');
	t.is(links[1].title, 'JoJo\'s Bizarre Adventure Episode (OVA)');
	t.is(links[1].link, 'http://www.chia-anime.me/episode/jojos-bizarre-adventure-episode/');
	t.is(links[1].levenshtein, 30);
});
