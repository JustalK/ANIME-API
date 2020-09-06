# micro-spelling-correcter [![Build Status](https://travis-ci.com/stroncium/nodejs-procfs.svg?branch=master)](https://travis-ci.com/stroncium/nodejs-procfs) [![codecov](https://codecov.io/gh/stroncium/micro-spelling-correcter/branch/master/graph/badge.svg)](https://codecov.io/gh/stroncium/micro-spelling-correcter)

Simple breadth-first early terminating Levenshtein distance auto correcter for small sets of possible resulting strings.

Finds first suiting correction for word if there is one with distance less or equal than target maximum distance and returns it, otherwise returns `undefined`.

Additionally, applies a simple heuristic of limiting max distance to half input length rounded down but not lessser than one, which helps to escape corrections which feel weird in real life(like 'a' => 'is', 'foo' => 'log' with distance 2).

Details:
 - Cost of every edit is counted as 1, though for every analyzed distance search tries skips then replacements then transpositions then additions.
 - Checks if word is in target word set at start and just returns the word if it is(so you don't need to check it yourself).

## Example

`npm install micro-spelling-correcter`

```js
const MicroSpellingCorrecter = require('micro-spelling-correcter');

let correcter = new MicroSpellingCorrecter(
	[ // list of target words
		'word',
		'sample',
		'hydralisk',
	],
	1 // target maximum distance, defaults to 2
);

correcter.correct('word'); // 'word', fast path
correcter.correct('wurd'); // 'word'
correcter.correct('simple'); // 'sample'
correcter.correct('mutalisk'); // undefined
correcter.correct('ampule'); // undefined
correcter.correct('ampule', 2); // 'sample', with custom edit distance of 2
```