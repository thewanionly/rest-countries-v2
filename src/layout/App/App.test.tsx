import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { mockedCountries, mockedCountryDetail } from 'mocks/data'
import { render, screen, waitForElementToBeRemoved } from 'mocks/setup'
import { INITIAL_ITEMS } from 'utilities/constants'

import { getBorders } from 'pages/DetailPage/DetailPage'

import App from './App'

const setup = (path: string = '/') => {
  window.history.pushState({}, '', path)
  render(<App />)
}

describe('Header', () => {
  it('displays header component', () => {
    setup()

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })
})

describe('Routing', () => {
  it.each`
    path     | pageTestId
    ${'/'}   | ${'home-page'}
    ${'/us'} | ${'detail-page'}
    ${'/jp'} | ${'detail-page'}
  `('displays $pageTestId when path is $path', ({ path, pageTestId }) => {
    setup(path)

    expect(screen.getByTestId(pageTestId)).toBeInTheDocument()
  })

  it.each`
    path     | pageTestId
    ${'/'}   | ${'detail-page'}
    ${'/us'} | ${'home-page'}
    ${'/jp'} | ${'home-page'}
  `('does not display $pageTestId when path is $path', ({ path, pageTestId }) => {
    setup(path)

    expect(screen.queryByTestId(pageTestId)).not.toBeInTheDocument()
  })

  it('displays the Detail page after clicking a country card', async () => {
    setup()

    const countries = await screen.findAllByTestId('country-card')
    userEvent.click(countries[0])

    await screen.findByTestId('detail-page')
    expect(
      await screen.findByRole('heading', { name: mockedCountryDetail.name.common })
    ).toBeInTheDocument()
  })

  it('displays another Detail page after clicking a border country in the current Detail page', async () => {
    setup('/us')

    await screen.findByTestId('detail-page')
    expect(
      await screen.findByRole('heading', { name: mockedCountryDetail.name.common })
    ).toBeInTheDocument()

    const borderCountriesDetails = getBorders(mockedCountryDetail.borders, mockedCountries)
    const borderList = screen.getByTestId('border-list')
    const borderCountries = borderList.childNodes

    expect(borderCountries[0].textContent).toBe(borderCountriesDetails[0].name)
    userEvent.click(borderCountries[0] as Element)

    await waitForElementToBeRemoved(screen.queryAllByText('Loading...'))
    expect(
      screen.getByRole('heading', { name: borderCountriesDetails[0].name })
    ).toBeInTheDocument()
  })

  it('displays the Home page after clicking Back button in the Detail page', async () => {
    setup('/us')

    userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })

  it('displays Home page when clicking top header text', async () => {
    setup('/us')

    userEvent.click(screen.getByRole('heading', { name: 'Where in the world?' }))
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })
})

describe('Caching', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it(`doesn't fetch from the API again for the countries data after going back to Home page from Detail page`, async () => {
    // Go to Home page
    setup()
    expect(screen.getAllByTestId('country-card-skeleton').length).toBe(INITIAL_ITEMS)

    // Go to Detail page
    const countries = await screen.findAllByTestId('country-card')
    userEvent.click(countries[0])
    await screen.findByTestId('detail-page')

    // Go back to Home page
    userEvent.click(screen.getByRole('button', { name: 'Back' }))

    expect(screen.queryAllByTestId('country-card-skeleton').length).toBe(0)
    expect(screen.getAllByTestId('country-card').length).toBe(INITIAL_ITEMS)
  })

  it(`doesn't fetch from the API again for the country detail data after going back to previously opened Detail page from Home page`, async () => {
    // Go to Detail page
    setup(`/${mockedCountryDetail.cca2.toLowerCase()}`)
    await screen.findByTestId('detail-page')
    expect(screen.getByTestId('country-detail-skeleton')).toBeInTheDocument()
    await screen.findByRole('heading', { name: mockedCountryDetail.name.common })

    // Go to Home page
    userEvent.click(screen.getByRole('button', { name: 'Back' }))

    // Go back to Detail page
    const countries = screen.getAllByTestId('country-card')
    userEvent.click(countries[0])

    expect(screen.queryByTestId('country-detail-skeleton')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: mockedCountryDetail.name.common })
    ).toBeInTheDocument()
  })

  it(`doesn't fetch from the API again for the regions data after going back to Home page from Detail page`, async () => {
    // Go to Home page
    setup()
    expect(screen.getAllByTestId('country-card-skeleton').length).toBe(INITIAL_ITEMS)
    expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()
    await screen.findByText('Filter by Region')

    // Go to Detail page
    const countries = await screen.findAllByTestId('country-card')
    userEvent.click(countries[0])
    await screen.findByTestId('detail-page')

    // Go back to Home page
    userEvent.click(screen.getByRole('button', { name: 'Back' }))

    expect(screen.queryByText('dropdown-skeleton')).not.toBeInTheDocument()
  })
})
