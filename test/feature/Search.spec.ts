import { createStore } from 'test/support/Helpers'
import { Model, Fields } from '@vuex-orm/core'

describe('Feature – Search', () => {
  class User extends Model {
    static entity = 'users'

    static fields(): Fields {
      return {
        id: this.attr(null),
        name: this.string(''),
        email: this.string('')
      }
    }

    id!: number
    name!: string
    email!: string
  }

  it('can fuzzy search records by a single term', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'walker.banana@example.com' }
      ]
    })

    const result = User.query().search('John').orderBy('id').get()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(1)
  })

  it('can fuzzy search records by many terms (compat)', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'walker.banana@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const result = User.query().search(['rin', 'obby']).orderBy('id').get()

    expect(result.length).toBe(2)
    expect(result[0].id).toBe(2)
    expect(result[1].id).toBe(3)
  })

  it('does nothing if `search` term is empty', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'walker.banana@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const result = User.query().search('').get()

    expect(result.length).toBe(3)
  })

  it('does nothing if `search` is not set', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'walker.banana@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const result = User.query().orderBy('id').get()

    expect(result.length).toBe(3)
  })

  it('can add global fuse options for the search', async () => {
    createStore([User], { keys: ['name'] })

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'mail.mail@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const result = User.query().search('rin mail').get()

    expect(result.length).toBe(1)
  })

  it('can add local fuse options for the search', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'mail.mail@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const result = User.query()
      .search('rin mail', { keys: ['name'] })
      .get()

    expect(result.length).toBe(1)
  })

  it('exposes raw search results on a query instance', async () => {
    createStore([User])

    await User.insert({
      data: [
        { id: 1, name: 'John Walker', email: 'john@example.com' },
        { id: 2, name: 'Bobby Banana', email: 'mail.mail@example.com' },
        { id: 3, name: 'Ringo Looper', email: 'ringo.looper@example.com' }
      ]
    })

    const query = User.query().search('walker', {
      includeScore: true,
      includeMatches: true
    })
    const result = query.get()

    expect(result).toHaveLength(1)
    expect(Object.keys(query.searchResults[0]).sort()).toEqual([
      'item',
      'matches',
      'refIndex',
      'score'
    ])
  })
})
