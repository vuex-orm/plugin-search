import { Options } from '../contracts/Options'
import { Collection } from '../contracts/Collection'
import {
  SearchResults,
  SearchExpression,
  SearchPattern
} from '../contracts/Query'

declare module '@vuex-orm/core' {
  interface Query<T> {
    /**
     * The search terms.
     */
    searchTerms: SearchExpression | null

    /**
     * The search options.
     */
    searchOptions: Options

    /**
     * The raw search results.
     */
    searchResults: SearchResults<T>

    /**
     * Add search configurations.
     */
    search(terms: SearchPattern, options?: Options): this

    /**
     * Filter the given record with fuzzy search by Fuse.js.
     */
    filterSearch(records: Collection): Collection<T>
  }
}
