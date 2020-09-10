const test = require('ava');
const m = require('../../src');
const nock = require('nock');

const scope = nock('http://www.chia-anime.me')
	.get('/mysearch.php?nocache&s=&search=mock%20anime%20api')
	.replyWithFile(400, './tests/static/chia-anime/chia_anime_search.html');

test('[STATIC] Testing if there is no search entered', async t => {
	const links = await m.links('');

	t.is(links.length, 0);
});

test('[STATIC] Testing if there is a 400 error on the website we try to scrap', async t => {
	const links = await m.links('mock anime api', {website: 'CHIA-ANIME'});

	t.is(links.length, 0);
});
