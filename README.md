<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: Search</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@vuex-orm/plugin-search">
    <img src="https://img.shields.io/npm/v/@vuex-orm/plugin-search?color=blue" alt="npm">
  </a>
  <a href="https://travis-ci.org/vuex-orm/plugin-search">
    <img src="https://travis-ci.org/vuex-orm/plugin-search.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://codecov.io/gh/vuex-orm/plugin-search">
    <img src="https://codecov.io/gh/vuex-orm/plugin-search/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://github.com/vuex-orm/plugin-search/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@vuex-orm/plugin-search.svg" alt="License">
  </a>
</p>

Vuex ORM Search plugin adds a `search()` query chain modifier to easily filter matched records using fuzzy search logic from the [Fuse.js](http://fusejs.io/) library.

A simple example to search for '_john_' within your query:

```js
const users = User.query().search('john').get()
```

<h2 align="center">Sponsors</h2>

<p align="center">Vuex ORM is sponsored by awesome folks. Big love to all of them from whole Vuex ORM community :two_hearts:</p>

<h4 align="center">Super Love Sponsors</h4>

<p align="center">
  <a href="https://github.com/petertoth">
    <img src="https://avatars2.githubusercontent.com/u/3661783?s=460&v=4" alt="Peter Tóth" width="88">
  </a>
  <a href="https://github.com/phaust">
    <img src="https://avatars1.githubusercontent.com/u/2367770?s=460&v=4" alt="Mario Kolli" width="88">
  </a>
  <a href="https://github.com/cannikan">
    <img src="https://avatars2.githubusercontent.com/u/21893904?s=460&v=4" alt="Cannikan" width="88">
  </a>
  <a href="https://github.com/somazx">
    <img src="https://avatars0.githubusercontent.com/u/7306?s=460&v=4" alt="Andy Koch" width="88">
  </a>
  <a href="https://github.com/dylancopeland">
    <img src="https://avatars1.githubusercontent.com/u/99355?s=460&v=4" alt="Dylan Copeland" width="88">
  </a>
</p>

<h4 align="center">Big Love Sponsors</h4>

<p align="center">
  <a href="https://github.com/geraldbiggs">
    <img src="https://avatars1.githubusercontent.com/u/3213608?s=460&v=4" alt="geraldbiggs" width="64">
  </a>
  <a href="https://github.com/cuebit">
    <img src="https://avatars0.githubusercontent.com/u/1493221?s=460&v=4" alt="Cue" width="64">
  </a>
  <a href="https://github.com/kazupon">
    <img src="https://avatars0.githubusercontent.com/u/72989?s=400&v=4" alt="Kazuya Kawaguchi" width="64">
  </a>
  <a href="https://github.com/jShaf">
    <img src="https://avatars3.githubusercontent.com/u/30289?s=400&v=4" alt="jShaf" width="64">
  </a>
</p>

<h4 align="center">A Love Sponsors</h4>

<p align="center">
  <a href="https://github.com/georgechaduneli">
    <img src="https://avatars1.githubusercontent.com/u/9340753?s=460&v=4" alt="George Chaduneli" width="48">
  </a>
  <a href="https://github.com/bpuig">
    <img src="https://avatars3.githubusercontent.com/u/22938625?s=460&v=4" alt="bpuig" width="48">
  </a>
  <a href="https://github.com/robokozo">
    <img src="https://avatars2.githubusercontent.com/u/1719221?s=400&v=4" alt="John" width="48">
  </a>
  <a href="https://github.com/mean-cj">
    <img src="https://avatars3.githubusercontent.com/u/1191385?s=400&v=4" alt="mean-cj" width="48">
  </a>
</p>

## Installation

Install `@vuex-orm/plugin-search` alongside Vuex ORM.

```bash
npm install @vuex-orm/core @vuex-orm/plugin-search --save
# OR
yarn add @vuex-orm/core @vuex-orm/plugin-search
```

Then install the plugin using Vuex ORM `use()` method.

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
search(terms: string | string[], options: Object): Query
```

- `terms` – any string or an array of strings.
- `options` – see the [Configurations](#configurations) section below.

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

Let's also specify the need to only search the `firstName` and `lastName` fields.

```js
const users = User.query().search('john', {
  caseSensitive: false,
  threshold: 0.3,
  keys: ['firstName', 'lastName']
}).get()
```

### Finding Results Matching Multiple Terms

Let's find all matches where both `pat` and `male` exist in our records, and sort by the date added.

```javascript
const data = User.query().search(['pat', 'male'], {
  keys: ['firstName', 'gender']
}).get()
```

## Questions & Discussions

Join us on our [Slack Channel](https://join.slack.com/t/vuex-orm/shared_invite/enQtNDQ0NjE3NTgyOTY2LTc1YTI2N2FjMGRlNGNmMzBkMGZlMmYxOTgzYzkzZDM2OTQ3OGExZDRkN2FmMGQ1MGJlOWM1NjU0MmRiN2VhYzQ) for any questions and discussions.

Although there is the Slack Channel, do not hesitate to open an [issue](https://github.com/vuex-orm/plugin-search/issues) for any question you might have. We're always more than happy to hear any feedback, and we don't care what kind of form they are.

## Plugins

Vuex ORM can be extended via plugins to add additional features. Here is a list of available plugins.

- [Vuex ORM Axios](https://github.com/vuex-orm/plugin-axios) – The plugin to sync the store against a RESTful API.
- [Vuex ORM GraphQL](https://github.com/vuex-orm/plugin-graphql) – The plugin to sync the store against a [GraphQL](https://graphql.org) API.
- [Vuex ORM Change Flags](https://github.com/vuex-orm/plugin-change-flags) - Vuex ORM plugin for adding IsDirty / IsNew flags to model entities.
- [Vuex ORM Soft Delete](https://github.com/vuex-orm/plugin-soft-delete) – Vuex ORM plugin for adding soft delete feature to model entities.

## Contribution

We are excited that you are interested in contributing to Vuex ORM Plugin: Search! Anything from raising an issue, submitting an idea of a new feature, or making a pull request is welcome! Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

### Pull Request Guidelines

When submitting a new pull request, please make sure to follow these guidelines:

- **For feature requests:** Checkout a topic branch from `dev` branch, and merge back against `dev` branch.
- **For bug fixes:** Checkout a topic branch from `master` branch, and merge back against `master` branch.

These rules also apply to the documentation. If you're submitting documentation about a new feature that isn't released yet, you must checkout the `dev` branch, but for non-functional updates, such as fixing a typo, you may checkout and commit to the `master` branch.

### Scripts

There are several scripts to help with development.

```bash
yarn build
```

Compile files and generate bundles in `dist` directory.

```bash
yarn lint
```

Lint files using [Prettier](https://prettier.io/).

```bash
yarn test
```

Run the test using [Jest](https://jestjs.io/).

```bash
yarn test:watch
```

Run the test in watch mode.

```bash
yarn coverage
```

Generate test coverage in `coverage` directory.

## License

Vuex ORM Plugin: Search is open-sourced software licensed under the [MIT license](./LICENSE).
