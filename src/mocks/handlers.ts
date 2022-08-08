// src/mocks/handlers.js
import { rest } from 'msw'

import { COUNTRIES_ALL } from '../utilities/constants'
import { mockedCountries, mockedRegions } from './data'

export const fetchAll = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(200), ctx.json(mockedRegions))
    }

    return res(ctx.status(200), ctx.json(mockedCountries))
  })
}

export const fetchAllCountriesError = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(200), ctx.json(mockedRegions))
    }

    return res(ctx.status(400), ctx.json({}))
  })
}

export const fetchAllCountriesEmpty = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(200), ctx.json(mockedRegions))
    }

    return res(ctx.status(200), ctx.json([]))
  })
}

export const fetchAllRegionsError = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(400), ctx.json({}))
    }

    return res(ctx.status(200), ctx.json(mockedCountries))
  })
}

export const fetchAllRegionsEmpty = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(ctx.status(200), ctx.json(mockedCountries))
  })
}

export const handlers = [fetchAll()]

//  // Handles a GET `{COUNTRIES_DETAIL}{cca2}`
//  rest.get(`${COUNTRIES_DETAIL}:cca2`, null),
