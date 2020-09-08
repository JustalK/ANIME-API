# ANIME-API

![Last version npm](https://img.shields.io/npm/v/@justalk/anime-api.svg?style=flat-square)
![Last version](https://img.shields.io/github/v/tag/justalk/anime-api.svg?style=flat-square)
[![Node version](https://img.shields.io/node/v/@justalk/anime-api.svg?style=flat-square)](https://www.npmjs.com/package/@justalk/anime-api)
[![Travis](https://img.shields.io/travis/com/justalk/anime-api.svg?style=flat-square)](https://travis-ci.com/github/JustalK/anime-api)
[![Coverage Status](https://coveralls.io/repos/github/JustalK/ANIME-API/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/JustalK/anime-api?branch=master)
[![Dependency status](http://img.shields.io/david/justalk/anime-api.svg?style=flat-square)](https://david-dm.org/justalk/anime-api.svg)
![Last version](https://img.shields.io/github/license/justalk/anime-api.svg?style=flat-square)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)

![Star the project](https://img.shields.io/github/stars/justalk/anime-api?style=social)

Api for searching page link, download link, streaming link of an anime and a precise episode on many website simultaneously.

`npm install @justalk/anime-api`

## Features

- **Get page links:** Get the page links of the anime on many website by searching an anime by name

- **Get download links:** Get the direct download link of an episode of an anime by anime name (incomming)

- **Get streaming links:** Get the streaming link of an episode of an anime by anime name (incomming)

## API

### Search by anime name

```js
async links(search, options)
```

| name | type | description |
| :--- | :---------- | :--- |
| search | String | name of the anime searched |
| options | Object | (optionnal) List of the options |

###### Lists of optionnal options available

| name of key | return type | description |
| :--- | :---------- | :--- |
| limit_per_website | Number | Limit the number of result per website |
| limit | Number | Limit the number of total result |
| website | String | Website that you wanna target |


## List of website available

The list below show the website scraped by the API and the website available for the option `website`

1. ANIMELAND
2. CHIA-ANIME
3. ANIME-XYZ

The list is increasing slowly. I am working on it.

### Examples

```js
const animeApi = require('@latsuj/anime-api');
const results = await animeApi.links('Naruto shippuden');
```

```js
results = [{
	source: 'ANIMELAND',
    title: 'Naruto Shippuden',
    link: 'https://www.animeland.us/dub/naruto-shippuden',
    levenshtein: 2
  },
  {
    source: 'CHIA-ANIME',
    title: 'Naruto Shippuden (TV)',
    link: 'http://www.chia-anime.me/episode/naruto%e3%83%8a%e3%83%ab%e3%83%88%e7%96%be%e9%a2%a8%e4%bc%9danime/',
    levenshtein: 7
  },
  {
    source: 'ANIMELAND',
    title: 'Naruto Shippuden Movie 7 The Last',
    link: 'https://www.animeland.us/dub/naruto-shippuden-movie-7-the-last',
    levenshtein: 19
}]
```

### How to test

For testing, install the node project and run the test command.

```shell
node install
npm test
```

Also, you can use the command under for running the test without the linter

```shell
npm run test-no
```

The API has two kind of tests.
1. dynamic : Perform query on the real Website.
2. static : Run the API through website mock, allowing the tests to be more precise.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
