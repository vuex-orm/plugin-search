import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
import Options from '@/contracts/Options'
import VuexORMSearch from '@/index'

export function createStore(
  models: typeof Model[],
  options?: Options
): Store<any> {
  Vue.use(Vuex)

  VuexORM.use(VuexORMSearch, options)

  const database = new Database()

  models.forEach((model) => {
    database.register(model)
  })

  return new Vuex.Store({
    plugins: [VuexORM.install(database)],
    strict: true
  })
}
