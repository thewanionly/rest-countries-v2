import { render, screen, waitFor, waitForElementToBeRemoved } from '../../mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { mockedCountries, mockedCountryDetail } from '../../mocks/data'

import App from './App'
import { getBorders } from '../../pages/DetailPage/DetailPage'

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

  xit('displays another Detail page after clicking a border country in the current Detail page', async () => {
    setup('/us')

    await screen.findByTestId('detail-page')
    expect(
      await screen.findByRole('heading', { name: mockedCountryDetail.name.common })
    ).toBeInTheDocument()

    // const borderCountriesDetails = getBorders(mockedCountryDetail.borders, mockedCountries)
    // const borderList = screen.getByTestId('border-list')
    // const borderCountries = borderList.childNodes

    // expect(borderCountries[0].textContent).toBe(borderCountriesDetails[0].name)
    // userEvent.click(borderCountries[0] as Element)

    // await screen.findByTestId('country-detail')
    // const borderList2 = screen.getByTestId('border-list')
    // const borderCountries2 = borderList2.childNodes
    // console.log('text  content', borderCountries2[0].textContent)
    // await screen.findByRole('heading', { name: borderCountriesDetails[0].name })

    // const border = screen.getByRole('button', { name: 'Canada' })
    // console.log('border', border)
    // userEvent.click(border)

    userEvent.click(screen.getByRole('button', { name: 'Canada' }))
    await waitForElementToBeRemoved(screen.queryAllByText('Loading...'))
    expect(screen.getByRole('heading', { name: 'Tae' })).toBeInTheDocument()
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
