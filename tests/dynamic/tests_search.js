const test = require('ava');
const m = require('../../src');

test('[DYNAMIC] Testing the search on the different website', async t => {
	const links = await m.links('naruto shippuden');

	t.assert(links.length > 0);
	t.is(links[0].source, 'ANIMELAND');
	t.is(links[0].title, 'Naruto Shippuden');
	t.is(links[0].link, 'https://www.animeland.us/dub/naruto-shippuden');
	t.is(links[0].levenshtein, 2);

	t.is(links[1].source, 'CHIA-ANIME');
	t.is(links[1].title, 'Naruto Shippuden (TV)');
	t.is(links[1].link, 'http://www.chia-anime.me/episode/naruto%e3%83%8a%e3%83%ab%e3%83%88%e7%96%be%e9%a2%a8%e4%bc%9danime/');
	t.is(links[1].levenshtein, 7);
});
