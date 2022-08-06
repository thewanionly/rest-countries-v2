// src/mocks/handlers.js
import { rest } from 'msw'

import { COUNTRIES_ALL } from '../utilities/constants'
import { mockedCountries, mockedRegions } from './data'

export const fetchAllCountries = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCountries))
  })
}

export const fetchAllRegions = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedRegions))
  })
}

export const fetchAllCountriesError = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({}))
  })
}

export const fetchAllCountriesEmpty = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  })
}

export const handlers = [fetchAllCountries(), fetchAllRegions()]

//  // Handles a GET `{COUNTRIES_DETAIL}{cca2}`
//  rest.get(`${COUNTRIES_DETAIL}:cca2`, null),
