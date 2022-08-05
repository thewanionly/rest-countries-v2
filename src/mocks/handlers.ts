// src/mocks/handlers.js
import { rest } from 'msw'

import { COUNTRIES_ALL } from '../utilities/constants'
import { mockedCountries, mockedRegions } from './data'

export const handlers = [
  rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    const isRegion = Boolean(req.url.searchParams.get('region'))

    // region
    if (isRegion) return res(ctx.status(200), ctx.json(mockedRegions))

    // all countries
    return res(ctx.status(200), ctx.json(mockedCountries))
  })
  //  // Handles a GET `{COUNTRIES_DETAIL}{cca2}`
  //  rest.get(`${COUNTRIES_DETAIL}:cca2`, null),
]

export const generateFetchError = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({}))
  })
}

export const generateFetchEmpty = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  })
}
