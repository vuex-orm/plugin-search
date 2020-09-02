import Fuse from 'fuse.js'
import { Query as BaseQuery } from '@vuex-orm/core'
import Options from '../contracts/Options'
import Collection from '../contracts/Collection'

export default function Query(query: typeof BaseQuery, options: Options): void {
  /**
   * The search terms.
   */
  query.prototype.searchTerms = null

  /**
   * The search options.
   */
  query.prototype.searchOptions = options

  /**
   * Add search configurations.
   */
  query.prototype.search = function(
    terms: string | string[],
    options: Options = {}
  ): BaseQuery {
    // If `terms` is single string, convert it to an array so we can use it
    // consistently afterward.
    this.searchTerms = Array.isArray(terms) ? terms : [terms]

    // If a user didn't provide `keys` option, set all model fields as default.
    if ((this.searchOptions.keys as string[]).length === 0) {
      this.searchOptions.keys = Object.keys(
        this.model.cachedFields[this.model.entity]
      )
    }

    // Finally, merge default options with users options.
    this.searchOptions = { ...this.searchOptions, ...options }

    return this
  }

  /**
   * Filter the given record with fuzzy search by Fuse.js.
   */
  query.prototype.filterSearch = function(collection: Collection): Collection {
    if (
      this.searchTerms === null ||
      this.searchTerms.filter(Boolean).length === 0
    ) {
      return collection
    }

    const fuse = new Fuse(collection, this.searchOptions)

    return this.searchTerms.reduce<Collection>((carry, term) => {
      carry.push(...fuse.search(term))

      return carry
    }, [])
  }
}
