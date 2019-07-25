export interface Options {
  distance?: number
  location?: number
  maxPatternLength?: number
  minMatchCharLength?: number
  searchPrimaryKey?: boolean
  shouldSort?: boolean
  threshold?: number
  tokenize?: boolean
  keys?: string[]
  verbose?: boolean
}

export default Options
