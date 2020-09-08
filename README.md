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

Api for searching animes on different website

`npm install @justalk/anime-api`

## Features

- **Get links:** Get the links of the website by searching an anime by name

## Website available

1. animeland
2. chia-anime

I am increasing the list progresively.

## API

### Search by anime name

```js
async links(search, options)
```

| name | type | description |
| :--- | :---------- | :--- |
| search | String | name of the anime searched |
| options | Object | List of the options |

###### Lists of options available

| name of key | return type | description |
| :--- | :---------- | :--- |
| limit_per_website | Number | Limit the number of result per website |
| limit | Number | Limit the number of total result |


### Examples

```js
const animeApi = require('@latsuj/anime-api');
const results = await animeApi.links('Naruto shippuden');
```

```json
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

There are two kinds of test. First, you have the dynamic tests, those are the tests who run the test on the different website. Basically, it's the tests on real situation or you could say the integration tests.
Secondly, you have the static tests. Those tests go more deep into the code. The modification on the actual website does not affect those test. Those tests are executed on mock of the page. They could be considered as my unit tests.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
