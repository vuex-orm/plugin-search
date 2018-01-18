# Vuex Orm Plugin: Search

This plugin adds a **search()** method to the vuex-orm query methods to easily filter matched records using fuzzy search logic from the [Fuse.js](http://fusejs.io/) library.

A simple example to search for '_john_' within your query:

```javascript
const data = this.$store.getters['entities/users/query']()
  .search('john')
  .orderBy('name', 'asc')
  .offset(0)
  .limit(10)
  .get()
```

### API

```typescript
search(term: any, options: Object<any>): Array<Records>
```

## Requirements:

The search plugin requires vuex-orm package version 0.15+

To upgrade the **vuex-orm package** simply run
```bash
npm install vuex-orm@latest --save
```

## Installation
```bash
npm install @vuex-orm/plugin-search --save
```

### Plugin Import Directions

Import the search plugin in the Vuex Store entry file.

```javascript
// ex: store/index.js
import VuexORM from 'vuex-orm'
import VuexORMSearch from '@vuex-orm/plugin-search'
````

Tell VuexORM to install the plugin

```javascript
VuexORM.use(VuexORMSearch, {
  // configure default fuse.js options here (see below)
})
```

### Fuse.js Default Options

The plugin provides opinionated default fuse.js options for token based matching for optimum performance. These options are easily changed at two stages of the plugin lifecycle:

- Plugin installation (sets the global default options)
- Runtime within the **search()** query chain

see: [Fuse.js](http://fusejs.io/) for demo

| Property | Description | Default | 
| --- | --- | --- |
| searchPrimaryKey | Also search the primary key | false |
| location | Approximately where in the text is the pattern expected to be found | 0 |
| distance | Determines how close the match must be to the fuzzy location | 100 |
| threshold | **0.0** requires a perfect match, and a threshold of **1.0** would match anything | 0.6 |
| maxPatternLength | Machine word size | 32 |
| caseSensitive | Indicates whether comparisons should be case sensitive | false |
| tokenSeparator | Regex used to separate words when searching. Only applicable when **tokenize** is **true** | / +/g |
| findAllMatches | When true, the algorithm continues searching to even if a perfect match is found | false |
| minMatchCharLength | Minimum number of characters that must be matched before a result is considered a match | 1 |
| keys | An array of fields (columns) to be included in the search | Model.$fields() |
| shouldSort | Whether to sort the result list, by score | false |
| tokenize | When true, the search algorithm will search individual words **and** the full string, computing the final score as a function of both. **Note**: that when _tokenize_ is _true_, the **threshold**, **distance**, and **location** are inconsequential for individual tokens | true |
| matchAllTokens | When true, the result set will only include records that match all tokens. Will only work if **tokenize** is also true. **Note**: It is better to use multiple **.search()** query chains if you have multiple terms that need to match. | false |
| verbose | Will print to the console. Useful for debugging. | false |

## Option Use Examples

**During Plugin Install**

For example, if we want to match based on case sensitive and no fuzzy search logic (perfect match)
```javascript
VuexORM.use(VuexORMSearch, {
  caseSensitive: true,
  threshold: 0
})
```

**During Query Chain**

The global install options will now default to case sensitive and no fuzzy logic, but for example we have a run-time case we need to ignore case and implement a slightly more strict fuzzy search threshold.

Let's also specify the need to only search the **firstName** and **lastName** fields.

```javascript
const options = {
  caseSensitive: false,
  threshold: 0.3,
  keys: ['firstName', 'lastName']
}
const data = this.$store.getters['entities/users/query']()
  .search('john', options)
  .orderBy('firstName', 'asc')
  .offset(0)
  .limit(10)
  .get()
```

