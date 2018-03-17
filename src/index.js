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

    // -- breaking change check in 0.23.1
    const { Query } = components
    Query.on('afterWhere', function (records, entity) {
      if (! this.searches.length) {
        // console.log('>> no search! return records')
        // console.log(records)
        return records
      }
      // console.log('>>>>>>> SEARCH <<<<<<<<')
      // console.log('this: ', this)
      // console.log('entity: ', entity)
      this.searches.forEach(({term, options}) => {
        const fuse = new Fuse(records, options)
        if (term && Array.isArray(term) && term.length) {
          term.forEach(_term => {
            records = fuse.search(_term)
          })
        } else {
          records = fuse.search(term)
        }
      })
      // -- clean up instance
      this.searches = []
      return records
    })

    // -- set global properties to use during query
    Query.prototype.searches = []
    Query.prototype.searchOptions = installOptions

    // -- global method to get all geys and loaded relations
    Query.prototype.allTheKeys = function () {
      // -- normal keys
      let fields = Object.keys(this.model.fields())
      // -- mutations
      fields.concat(Object.keys(this.model.mutators))
      // -- related (1 deep)
      this.load.forEach(({name}) => {
        const relatedFields = Object.keys(this.getModel(name).fields())
        fields.concat(relatedFields.map(rf => `${name}.${rf}`))
      })
      return fields
    }

    Query.prototype.search = function(term, singleOptions = {}) {

      if (term === undefined || term === '' || (Array.isArray(term) && !term.length) || term === null) {
        return this
      }

      // -- override default keys if run-time initializes keys
      const instanceOptions = {
        ...this.searchOptions,
        ...singleOptions,
        ...{
          keys: singleOptions.keys && singleOptions.keys.length ? singleOptions.keys : this.allTheKeys()
        }
      }
      //-- add search filter
      // console.log('>>> Add Search [Entity]: ', this.entity)
      this.searches.push({term: term, options: instanceOptions})

      // console.log('>>> ADD SEARCHES << ', this.searches)

      // -- return query chain
      return this
    }
  }

}
export default plugin
