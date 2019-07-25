import Options from '../contracts/Options'

export const DefaultOptions: Options = {
  distance: 100,
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  searchPrimaryKey: false,
  shouldSort: false,
  threshold: 0.3,
  tokenize: false,
  keys: [],
  verbose: false
}

export default DefaultOptions
