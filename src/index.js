import Fuse from 'fuse.js'

export const defaultOptions = {
  searchPrimaryKey: false,
  tokenize: false,
  shouldSort: false,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  verbose: false,
  debug: false,
  keys: []
}

const plugin = {
  // `components` contains Vuex ORM objects such as Model, Repo, or Query.
  // The plugin author can then extend those objects to add whatever
  // features it needs.
  install (components, pluginOptions) {
    const installOptions = {...defaultOptions, ...pluginOptions}

    components.Repo.prototype.search = function (term, singleOptions = {}) {
      const fields = this.entity.fields()

      // -- default search keys are all model fields
      let searchKeys = Object.keys(fields)

      // -- override default keys if plugin initializes keys
      if (Array.isArray(pluginOptions.keys) && pluginOptions.keys.length) {
        searchKeys = pluginOptions.keys
      }

      // -- override default keys if run-time initializes keys
      if (Array.isArray(singleOptions.keys) && singleOptions.keys.length) {
        searchKeys = singleOptions.keys
      }
      const primaryKey = this.entity.primaryKey

      let options = {...installOptions, ...singleOptions}

      if (!options.searchPrimaryKey) {
        let pkIndex = searchKeys.indexOf(primaryKey)
        if (pkIndex !== -1) {
          searchKeys.splice(pkIndex, 1)
        }
      }
      options.keys = searchKeys
      if (options.debug) {
        console.log('---- SEARCH OPTIONS ----')
        console.log(options)
        console.log('------------------------')
      }
      const records = this.query.records
      const fuse = new Fuse(records, options)
      try {
        this.query.records = fuse.search(term)
      } catch (e) {
        if (options.verbose) {
          console.log('error in search query, ignoring chain...', e)
        }
      }
      return this
    }
  }

}
export default plugin
