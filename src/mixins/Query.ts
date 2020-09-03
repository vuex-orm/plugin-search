import Fuse from 'fuse.js'
import { Query as BaseQuery } from '@vuex-orm/core'
import { Options } from '../contracts/Options'

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
   * The raw search results.
   */
  query.prototype.searchResults = []

  /**
   * Add search configurations.
   */
  query.prototype.search = function (pattern, options = {}) {
    // For backward-compat, transform Array<string> to string type.
    this.searchTerms = Array.isArray(pattern)
      ? pattern.filter(Boolean).join(' ')
      : pattern || null

    // If a user didn't provide a `keys` option, set it to all model fields by default.
    if (!this.searchOptions.keys || this.searchOptions.keys.length === 0) {
      this.searchOptions.keys = Object.keys(this.model.getFields())
    }

    // Merge default options with query options.
    this.searchOptions = { ...this.searchOptions, ...options }

    return this
  }

  /**
   * Filter the given record with fuzzy search by Fuse.js.
   */
  query.prototype.filterSearch = function (collection) {
    if (this.searchTerms === null || this.searchTerms === '') {
      return collection
    }

    const fuse = new Fuse(collection, this.searchOptions)

    this.searchResults = fuse.search(this.searchTerms)

    return this.searchResults.map((result) => result.item)
  }
}
