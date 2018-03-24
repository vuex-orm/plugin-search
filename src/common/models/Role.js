import { Model } from '@vuex-orm/core'

export default class Role extends Model {
  static entity = 'roles'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}
