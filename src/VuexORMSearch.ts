import { Query } from '@vuex-orm/core'
import { Components } from './contracts/Components'
import { Options } from './contracts/Options'
import { Collection } from './contracts/Collection'
import DefaultOptions from './config/DefaultOptions'
import QueryMixin from './mixins/Query'

export default class VuexORMSearch {
  /**
   * The query object.
   */
  query: typeof Query

  /**
   * The options.
   */
  options: Options

  /**
   * Create a new Vuex ORM Search instance.
   */
  constructor(components: Components, options: Options) {
    this.query = components.Query
    this.options = { ...DefaultOptions, ...options }
  }

  /**
   * Plugin features.
   */
  plugin(): void {
    this.mixQuery()

    this.registerQueryHook()
  }

  /**
   * Apply query mixin.
   */
  mixQuery(): void {
    QueryMixin(this.query, this.options)
  }

  /**
   * Register global `afterWhere` hook to execute search filtering during the
   * select process.
   */
  registerQueryHook(): void {
    this.query.on('afterWhere', function (
      this: Query,
      collection: Collection
    ): Collection {
      return this.filterSearch(collection)
    })
  }
}
