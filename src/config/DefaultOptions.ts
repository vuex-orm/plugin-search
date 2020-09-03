import * as Options from '../contracts/Options'

export const matchOptions: Options.MatchOptions = {
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1
}

export const basicOptions: Options.BasicOptions = {
  isCaseSensitive: false,
  includeScore: false,
  keys: [],
  shouldSort: false
}

export const fuzzyOptions: Options.FuzzyOptions = {
  location: 0,
  threshold: 0.5,
  distance: 100
}

export const advancedOptions: Options.AdvancedOptions = {
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false
}

export const defaultOptions: Options.Options = {
  ...matchOptions,
  ...basicOptions,
  ...fuzzyOptions,
  ...advancedOptions
}

export default defaultOptions
