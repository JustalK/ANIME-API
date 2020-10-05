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
	t.is(links[1].title, 'Naruto Shippuden');
	t.is(links[1].link, 'http://www.chia-anime.me/episode/naruto%e3%83%8a%e3%83%ab%e3%83%88%e7%96%be%e9%a2%a8%e4%bc%9danime/');
	t.is(links[1].levenshtein, 2);
});

test('[DYNAMIC] Testing the search of a streaming links on many websites', async t => {
	const stream = await m.stream('naruto shippuden', 500);

	console.log(stream);

	t.assert(stream.length > 0);
	const stream_chiaanime = stream.find(element => element.source === 'CHIA-ANIME');
	t.is(stream_chiaanime.source, 'CHIA-ANIME');
	t.is(stream_chiaanime.link, 'http://www.chia-anime.me/naruto-shippuden-episode-500-english-subbed/');

	const stream_gogoanime = stream.find(element => element.source === 'GOGOANIME');
	t.is(stream_gogoanime.source, 'GOGOANIME');
	t.is(stream_gogoanime.link, 'https://www3.gogoanime.pro/anime/naruto-shippuden-qv3/ep-500');
});

test('[DYNAMIC] Testing the search of a download links on many websites', async t => {
	const download = await m.download('naruto shippuden', 500);

	t.assert(download.length > 0);
	const download_chiaanime = download.find(element => element.source === 'CHIA-ANIME');
	t.is(download_chiaanime.source, 'CHIA-ANIME');
	t.truthy(download_chiaanime.link);
});
