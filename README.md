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

## Short Example

If you want to search for a streaming link of the episode 387 of naruto shippuden

```js
const animeapi = require('@justalk/anime-api');
const stream = await animeapi.stream('naruto shippuden', 387);
```

## Features

- **Get page links:** Get the page links of the anime on many website by searching an anime by name

- **Get streaming links:** Get the streaming link of an episode of an anime by anime name

- **Get download links:** Get the direct download link of an episode of an anime by anime name (incomming)

## API

### Search page link by anime name

```js
async links(search, options)
```

| name | type | description |
| :--- | :---------- | :--- |
| search | String | name of the anime searched |
| options | Object | (optionnal) List of the options |

###### Lists of optionnal options available for page links

| name of key | return type | description |
| :--- | :---------- | :--- |
| limit_per_website | Number | Limit the number of result per website |
| limit | Number | Limit the number of total result |
| website | String | Website that you wanna target, see under for the complete list |

### Search streaming link by anime name

| name | type | description |
| :--- | :---------- | :--- |
| search | String | name of the anime searched |
| episode | Number | number of the episode searched |
| options | Object | (optionnal) List of the options |

### List of website available

The list below show the website scraped by the API and the website available for the option `website`

| website variable | website url |
| :--- | :---------- |
| ANIMELAND | https://www.animeland.us/ |
| CHIA-ANIME | http://www.chia-anime.me/ |
| ANIMEOUT | https://www.animeout.xyz/ |
| GOGOANIME | https://www3.gogoanime.pro/ |

The list is increasing slowly. I am working on it.

### Examples

###### Searching page link of naruto shippuden

```js
const animeapi = require('@latsuj/anime-api');
const results = await animeapi.links('Naruto shippuden');
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
    source: 'ANIMEOUT',
    title: 'Naruto Shippuden Movie 7 The Last',
    link: 'https://www.animeland.us/dub/naruto-shippuden-movie-7-the-last',
    levenshtein: 19
}]
```
###### Searching page link of naruto shippuden

```js
const animeapi = require('@justalk/anime-api');
const stream = await animeapi.stream('naruto shippuden', 387);
```

```js
results = [{
    source: 'ANIMELAND',
    link: 'https://www.animeland.us/naruto-shippuden-episode-500-english-dubbed'
  },
  {
    source: 'CHIA-ANIME',
    link: 'http://www.chia-anime.me/naruto-shippuden-episode-500-english-subbed/'
}]
```

### How to contribute/test

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

I am also using `winston` for filling up logs.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
