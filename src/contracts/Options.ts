import Fuse from 'fuse.js'

export interface BasicOptions {
  isCaseSensitive?: boolean
  includeScore?: boolean
  keys?: Fuse.FuseOptionKey[]
  shouldSort?: boolean
}

export interface MatchOptions {
  includeMatches?: boolean
  findAllMatches?: boolean
  minMatchCharLength?: number
}

export interface FuzzyOptions {
  location?: number
  threshold?: number
  distance?: number
}

export interface AdvancedOptions {
  useExtendedSearch?: boolean
  ignoreLocation?: boolean
  ignoreFieldNorm?: boolean
}

export type Options = BasicOptions &
  MatchOptions &
  FuzzyOptions &
  AdvancedOptions
