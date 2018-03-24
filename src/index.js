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
  install (components, installOptions) {

    const pluginOptions = {...defaultOptions, ...installOptions}

    // -- breaking change check in 0.23.1
    const {Query} = components
    /*
    const searchKeys = function () {
      // -- normal keys
      const modelFields = Object.keys(this.model.fields())
      // -- mutations
      const mutationFields = Object.keys(this.model.mutators)

      // -- related (1 deep)
      let relatedFields = []
      this.load.forEach(relationship => {
        const relatedModel = this.getModel(relationship.name)
        if (relatedModel) {
          relatedFields.concat(
            Object.keys(relatedModel.fields())
            .map(rf => `${relationship.name}.${rf}`)
          )
        }
      })
      if (process.env.ENVIRONMENT === 'testing') {
        console.log(' -- LOADED --')
        console.log(this.load)
        console.log(' ----- MODEL ---- ')
        console.log(modelFields)
        console.log(' ----- MUTATORS ---- ')
        console.log(mutationFields)
        console.log(' ----- RELATED ---- ')
        console.log(relatedFields)
      }
      return modelFields.concat(mutationFields).concat(relatedFields)
    }
    */

    const searchProcess = function ({records, entity, term, options}) {

      if (options.debug || process.env.ENVIRONMENT === 'testing') {
        console.log(' ---------- PROCESS SEARCH HOOK CALLED -------------- ')
        console.log(' > Term: ', term)
        console.log(' > Records Count: ', records.length)
        console.log(' > Entity: ', entity)
        console.log(' > Keys: ', options.keys)
      }

      const fuse = new Fuse(records, options)

      if (term && Array.isArray(term) && term.length) {
        term.forEach(_term => {
          records = fuse.search(_term).slice(0)
        })
      } else {
        records = fuse.search(term).slice(0)
      }

      if (options.debug || process.env.ENVIRONMENT === 'testing') {
        console.log(' > Results Count: ', records.length)
        console.log(' ---------- END SEARCH -------------- ')
      }

      return records

    }

    const search = function (term, singleOptions = {}) {

      if (pluginOptions.debug || process.env.ENVIRONMENT === 'testing' || singleOptions.debug) {
        console.log(' ---------- + ADD NEW SEARCH CHAIN ----------- ')
        console.log(' > TERM: ', term)
      }

      if (term === undefined || term === '' || (Array.isArray(term) && !term.length) || term === null) {
        if (pluginOptions.debug || process.env.ENVIRONMENT === 'testing' || singleOptions.debug) {
          console.log(' > NO TERM FOUND - EXIT')
        }
        return this
      }

      //-- get default keys
      // const allKeys = searchKeys.call(this)

      // -- override default keys if run-time initializes keys
      let instanceOptions = {
        ...pluginOptions,
        ...singleOptions
      }
      if (instanceOptions.keys && !instanceOptions.keys.length) {
        instanceOptions.keys = Object.keys(this.model.fields())
      }

      if (pluginOptions.debug || process.env.ENVIRONMENT === 'testing' || singleOptions.debug) {
        console.log(' > Search Keys: ', instanceOptions.keys)
        console.log(' > Add Instance Hook ... ')
      }

      this.self().on('afterWhere', ((records, entity) => searchProcess.call(this, {records: records, entity: entity, term: term, options: instanceOptions})), true)

      if (pluginOptions.debug || process.env.ENVIRONMENT === 'testing' || singleOptions.debug) {
        console.log(' > Hook added OK')
        console.log(this.self().hooks)
        console.log(' > Return query chain --this--', typeof this)
        console.log(' ---------- END ADD SEARCH ---------- ')
      }

      // -- return query chain
      return this
    }

    // -- prototype methods
    // Query.prototype.searchKeys = searchKeys
    Query.prototype.search = search

  }
}
export default plugin
