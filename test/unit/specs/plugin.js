import { store } from 'src/dev'

console.log('ENV:', process.env.ENVIRONMENT)

describe('Setup unit tests', function () {
  it('Can initialize Vuex store', function () {
    expect(store)
  })
  it('Can add data to Users', function () {

    store.dispatch('entities/users/create', {
      data: [
        {
          id: 1,
          name: 'John Walker',
          email: 'john@gmail.com',
          phone: '(555) 281-4567'
        },
        {
          id: 2,
          name: 'Bobby Banana',
          email: 'walker.banana@gmail.com',
          phone: '(555) 555-4567'
        }
      ]
    })

    const records = store.getters['entities/users/query']().all()

    expect(records).to.have.lengthOf(2)

  })

  it('Can create a search using plugin', function () {
    const records = store.getters['entities/users/query']()
    .search('walker', {keys: ['name', 'email']})
    .get()
    expect(records).to.have.lengthOf(2)

    console.log('**************************************')

    const records2 = store.getters['entities/users/query']()
    .search('walker', {keys: ['email']})
    .get()
    expect(records2).to.have.lengthOf(1)
  })

})
