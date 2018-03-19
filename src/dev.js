import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMSearchPlugin from 'src/index'
import User from './common/models/User'

Vue.use(Vuex)
VuexORM.use(VuexORMSearchPlugin)

const database = new VuexORM.Database()
database.register(User, {})

export const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})
