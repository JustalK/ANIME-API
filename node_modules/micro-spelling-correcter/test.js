const test = require('ava');

const MicroSpellingCorrecter = require('.');

test('example', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'sample', 'hydralisk'], 1);

	t.is(correcter.correct('word'), 'word');
	t.is(correcter.correct('wurd'), 'word');
	t.is(correcter.correct('simple'), 'sample');
	t.is(correcter.correct('mutalisk'), undefined);
	t.is(correcter.correct('ampule'), undefined);
	t.is(correcter.correct('ampule', 2), 'sample');
});

test('word from set', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'werd', 'bard', 'ward']);

	t.is(correcter.correct('word', 0), 'word');
	t.is(correcter.correct('word', 1), 'word');
	t.is(correcter.correct('word', 2), 'word');
	t.is(correcter.correct('word', 3), 'word');
});

test('distance 0', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'goodwurd'], 0);
	t.is(correcter.correct('wurd'), undefined);
	t.is(correcter.correct('wrd'), undefined);
	t.is(correcter.correct('wrod'), undefined);
	t.is(correcter.correct('woord'), undefined);
	t.is(correcter.correct('weird'), undefined);
});

test('distance 1', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'goodwurd'], 1);
	t.is(correcter.correct('wurd'), 'word');
	t.is(correcter.correct('wrd'), 'word');
	t.is(correcter.correct('wrod'), 'word');
	t.is(correcter.correct('woord'), 'word');
	t.is(correcter.correct('weird'), undefined);
});

test('distance 2', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'goodwurd'], 2);
	t.is(correcter.correct('wurd'), 'word');
	t.is(correcter.correct('wrd'), 'word');
	t.is(correcter.correct('wrod'), 'word');
	t.is(correcter.correct('woord'), 'word');
	t.is(correcter.correct('weird'), 'word');
	t.is(correcter.correct('qerd'), 'word');
	t.is(correcter.correct('owdr'), 'word');
	t.is(correcter.correct('wooord'), 'word');
	t.is(correcter.correct('weeird'), undefined);
});

test('prefers shorter edit distance', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'weird']);
	t.is(correcter.correct('werd', 2), 'word');
});

test('max distance heuristic', t => {
	let correcter = new MicroSpellingCorrecter(['is', 'log'], 2);
	t.is(correcter.correct('a'), undefined);
	t.is(correcter.correct('foo'), undefined);
});
