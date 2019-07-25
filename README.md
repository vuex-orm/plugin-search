<p align="center">
  <img width="192" src="https://github.com/vuex-orm/plugin-search/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex Orm Plugin: Search</h1>

<p align="center">
  <a href="https://travis-ci.org/vuex-orm/plugin-search">
    <img src="https://travis-ci.org/vuex-orm/plugin-search.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://codecov.io/gh/vuex-orm/plugin-search">
    <img src="https://codecov.io/gh/vuex-orm/plugin-search/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide">
  </a>
  <a href="https://github.com/vuex-orm/plugin-search/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@vuex-orm/plugin-search.svg" alt="License">
  </a>
</p>

Vuex ORM Search plugin adds a **search()** method to the vuex-orm query methods to easily filter matched records using fuzzy search logic from the [Fuse.js](http://fusejs.io/) library.

A simple example to search for '_john_' within your query:

```js
const users = User.query().search('john').get()
```

## Installation

Install `@vuex-orm/plugin-search` alongside with Vuex ORM Core.

```bash
# Via NPM.
npm install @vuex-orm/core @vuex-orm/plugin-search --save

# Via Yarn.
yarn add @vuex-orm/core @vuex-orm/plugin-search
```

## Setup

Import the search plugin in the Vuex Store entry file.

```js
import VuexORM from '@vuex-orm/core'
import VuexORMSearch from '@vuex-orm/plugin-search'

VuexORM.use(VuexORMSearch, {
  // Configure default fuse.js options here (see "Configuration" section below).
})
```

### API

The search plugin method accepts two parameters.

```ts
search(terms: string | string[], options: object): this
```

- **terms** – any string or an array of strings.
- **options** – see the "Configurations" section below.

> **NOTE:** If passing an array of search terms, the results assume some element in the array to be matched.

## Configurations

The plugin provides opinionated default Fuse.js options for token-based matching for optimum performance. These options can be easily changed at two stages of the plugin lifecycle:

- Plugin installation (sets the global default options).
- Runtime within the **search()** query chain.

See: [Fuse.js](http://fusejs.io/) for demo.

| Property | Description | Default |
| --- | --- | --- |
| searchPrimaryKey | Also search the primary key | `false` |
| location | Approximately where in the text is the pattern expected to be found | `0` |
| distance | Determines how close the match must be to the fuzzy location | `100` |
| threshold | **0.0** requires a perfect match, and a threshold of **1.0** would match anything | `0.3` |
| maxPatternLength | Machine word size | `32` |
| caseSensitive | Indicates whether comparisons should be case sensitive | `false` |
| tokenSeparator | Regex used to separate words when searching. Only applicable when **tokenize** is **true** | `/ +/g` |
| findAllMatches | When true, the algorithm continues searching to even if a perfect match is found | `false` |
| minMatchCharLength | Minimum number of characters that must be matched before a result is considered a match | `1` |
| keys | An array of fields (columns) to be included in the search | Keys from `Model.fields()` |
| shouldSort | Whether to sort the result list, by score | `false` |
| tokenize | When true, the search algorithm will search individual words **and** the full string, computing the final score as a function of both. **NOTE**: that when _tokenize_ is _true_, the **threshold**, **distance**, and **location** are inconsequential for individual tokens | `false` |
| matchAllTokens | When true, the result set will only include records that match all tokens. Will only work if **tokenize** is also true. **NOTE**: It is better to use multiple **.search()** query chains if you have multiple terms that need to match. | `false` |
| verbose | Will print to the console. Useful for debugging. | `false` |

## Option Examples

Here are some examples on how to use the search plugin with case specific options.

### During Plugin Install

For example, if we want to match based on case sensitive and no fuzzy search logic (perfect match).

```js
VuexORM.use(VuexORMSearch, {
  caseSensitive: true,
  threshold: 0
})
```

### During Query Chain

The global install options will now default to case sensitive and no fuzzy logic, but for example we have a run-time case we need to ignore case and implement a slightly more strict fuzzy search threshold.

Let's also specify the need to only search the **firstName** and **lastName** fields.

```js
const users = User.query().search('john', {
  caseSensitive: false,
  threshold: 0.3,
  keys: ['firstName', 'lastName']
}).get()
```

### Finding Results Matching Multiple Terms

Let's find all matches where both **pat** and **male** exist in our records, and sort by the date added.

```javascript
const data = User.query().search(['pat', 'male'], {
  keys: ['firstName', 'gender']
}).get()
```

## Contribution

We are excited that you are interested in contributing to Vuex ORM Search! Anything from raising an issue, submitting an idea of a new feature, or making a pull request is welcome!

### Development

```bash
$ yarn build
```

Compile files and generate bundles in `dist` directory.

```bash
$ yarn lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn test
```

Run the test using [Jest](https://jestjs.io/).

```bash
$ yarn test:watch
```

Run the test in watch mode.

```bash
$ yarn coverage
```

Generate test coverage in `coverage` directory.

## License

The Vuex ORM Plugin Search is open-sourced software licensed under the [MIT license](LICENSE.md).
