import Fuse from 'fuse.js'

export type SearchExpression = string | Fuse.Expression

export type SearchPattern = string | string[] | Fuse.Expression

export type SearchResults<T> = Fuse.FuseResult<T>[]
