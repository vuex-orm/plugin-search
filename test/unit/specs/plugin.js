import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMSearchPlugin from 'src/index'

const { Model } = VuexORM

describe('Search Plugin', () => {
  class User extends Model {
    static entity = 'users'

    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(''),
        email: this.attr(''),
        phone: this.attr('')
      }
    }
  }

  const database = new VuexORM.Database()

  database.register(User, {})

  Vue.use(Vuex)

  it('install search plugin', async () => {
    VuexORM.use(VuexORMSearchPlugin)

    const store = new Vuex.Store({
      plugins: [VuexORM.install(database)]
    })

    await store.dispatch('entities/users/create', {
      data: {
        id: 1,
        name: 'John Walker',
        email: 'joe.walker81@gmail.com',
        phone: '(555) 281-4567'
      }
    })
    await store.dispatch('entities/users/create', {
      data: {
        id: 2,
        name: 'Bob Walker',
        email: 'bob.walker87@gmail.com',
        phone: '(555) 555-4567'
      }
    })

    const user = store.getters['entities/users/find'](1)

    expect(user.id).toBe(1)
    expect(user.name).toBe('John Walker')

    const results = store.getters['entities/users/query']()
      .search('walker')
      .get()

    expect(results.length).toBe(2)

    const nameSearch = store.getters['entities/users/query']()
    .search('bob', {keys: ['name']})
    .get()

    expect(nameSearch.length).toBe(1)
    expect(nameSearch[0].id).toBe(2)

    const notFoundResults = store.getters['entities/users/query']()
    .search('bob', {keys: ['phone']})
    .get()

    expect(nameSearch.length).toBe(0)

  })

})