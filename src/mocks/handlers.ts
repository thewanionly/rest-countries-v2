// src/mocks/handlers.js
import { rest } from 'msw'

import { COUNTRIES_ALL } from '../utilities/constants'
import { mockedCountries } from './data'

export const handlers = [
  // Handles a GET `{COUNTRIES_ALL}{FIELDS_FILTER}`
  rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    // req.url.searchParams.get('flag') to get the params
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
