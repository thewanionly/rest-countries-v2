// src/mocks/handlers.js
import { rest } from 'msw'

import { COUNTRIES_ALL, COUNTRIES_DETAIL } from '../utilities/constants'
import { mockedCountries, mockedRegions, mockedCountryDetail, mockedCountryDetail2 } from './data'

export const fetchAll = () => {
  return rest.get(`${COUNTRIES_ALL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('fields') === 'region') {
      return res(ctx.status(200), ctx.json(mockedRegions))
    }

    return res(ctx.status(200), ctx.json(mockedCountries))
  })
}

export const fetchCountryDetail = () => {
  return rest.get(`${COUNTRIES_DETAIL}:code`, (req, res, ctx) => {
    const { code } = req.params

    let countryDetail = mockedCountryDetail

    if (code === 'us') {
      countryDetail = mockedCountryDetail
    }

    if (code === 'ca') {
      countryDetail = mockedCountryDetail2
    }

    return res(ctx.status(200), ctx.json(countryDetail))
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

export const fetchCountryDetailsError = () => {
  return rest.get(`${COUNTRIES_DETAIL}:code`, (req, res, ctx) => {
    // const { code } = req.params
    return res(ctx.status(400), ctx.json({}))
  })
}

export const mockedMatchMedia = () => {
  return Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
}

export const handlers = [fetchAll(), fetchCountryDetail()]
