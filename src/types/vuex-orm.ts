import Options from '../contracts/Options'
import Collection from '../contracts/Collection'

declare module '@vuex-orm/core' {
  interface Query {
    /**
     * The search terms.
     */
    searchTerms: string[] | null

    /**
     * The search options.
     */
    searchOptions: Options

    /**
     * Add search configurations.
     */
    search(terms: string | string[], options?: Options): this

    /**
     * Filter the given record with fuzzy search by Fuse.js.
     */
    filterSearch(records: Collection): Collection
  }
}
