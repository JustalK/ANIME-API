const test = require('ava');
const m = require('../../../src');

test('[INDEX] Simple useless test', async t => {
	const links = await m.links('jojo');

	t.assert(1 !== 10);
});
