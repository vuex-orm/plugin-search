import { Model } from '@vuex-orm/core'
import Role from './Role'

export default class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      email: this.attr(''),
      phone: this.attr(''),
      roleId: this.attr(1),
      role: this.belongsTo(Role, 'roleId')
    }
  }
  get formattedPhone () {
    return this.phone
  }
}
