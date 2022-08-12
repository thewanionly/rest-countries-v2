/** Rest Countries API */
export const BASE_API = `https://restcountries.com/v3.1/`

export const COUNTRIES_ALL = `${BASE_API}all`
export const COUNTRIES_DETAIL = `${BASE_API}alpha/`

export const COUNTRIES_ALL_FIELDS = `cca2,flags,name,capital,region,population`
export const COUNTRIES_DETAIL_FIELDS = `cca2,flags,name,capital,region,subregion,population,tld,currencies,languages,borders`

/** Other constants */
export const PAGE_LIMIT = 8
export const TIMEOUT_SEC = 20
