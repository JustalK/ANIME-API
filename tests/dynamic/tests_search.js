const test = require('ava');
const m = require('../../src');

test('[DYNAMIC] Testing the search on the different website', async t => {
	const links = await m.links('naruto shippuden');

	console.log(links);

	t.assert(links.length > 0);
	t.is(links[0].source, 'ANIMELAND');
	t.is(links[0].title, 'Naruto Shippuden');
	t.is(links[0].link, 'https://www.animeland.us/dub/naruto-shippuden');
	t.is(links[0].levenshtein, 2);

	t.is(links[1].source, 'CHIA-ANIME');
	t.is(links[1].title, 'Naruto Shippuden');
	t.is(links[1].link, 'http://www.chia-anime.me/episode/naruto%e3%83%8a%e3%83%ab%e3%83%88%e7%96%be%e9%a2%a8%e4%bc%9danime/');
	t.is(links[1].levenshtein, 2);
});
/**
test('[DYNAMIC] Testing the search of a streaming on the different website', async t => {
	const stream = await m.stream('naruto shippuden', 500);

	console.log(stream);

	t.assert(stream.length > 0);
	const stream_chiaanime = stream.find(element => element.source === 'CHIA-ANIME');
	t.is(stream_chiaanime.source, 'CHIA-ANIME');
	t.is(stream_chiaanime.link, 'http://www.chia-anime.me/naruto-shippuden-episode-500-english-subbed/');

	const stream_animeland = stream.find(element => element.source === 'ANIMELAND');
	t.is(stream_animeland.source, 'ANIMELAND');
	t.is(stream_animeland.link, 'https://www.animeland.us/naruto-shippuden-episode-500-english-dubbed');
});
**/
