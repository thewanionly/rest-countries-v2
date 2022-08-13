import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'

import { mockedCountries, mockedCountryDetail } from '../../mocks/data'
import CountryDetail from './CountryDetail'
import { formatNumber } from '../../utilities/helpers'
import { getBorders, getNativeNames } from '../../pages/DetailPage/DetailPage'

const {
  cca2,
  name,
  flags,
  population,
  region,
  capital,
  subregion,
  tld,
  currencies,
  languages,
  borders
} = mockedCountryDetail

const borderObj = borders && getBorders(borders, mockedCountries)

const setup = () => {
  render(
    <CountryDetail
      code={cca2}
      name={name.common}
      nativeName={getNativeNames(name.nativeName, languages)}
      flag={flags.svg}
      population={population}
      region={region}
      subregion={subregion}
      capital={capital}
      topLevelDomain={tld}
      currencies={Object.values(currencies).map(({ name, symbol }) => `${name} (${symbol})`)}
      languages={Object.values(languages)}
      borders={borderObj}
    />
  )
}

describe('Country Detail component', () => {
  it('displays flag of the country', () => {
    setup()
    const countryFlagImg = screen.getByAltText(`${cca2} wide flag`)
    expect(countryFlagImg).toBeInTheDocument()
    expect(countryFlagImg).toHaveAttribute('src', flags.svg)
  })

  it('displays the country name', () => {
    setup()
    expect(screen.getByRole('heading', { name: name.common })).toBeInTheDocument()
  })

  it(`displays the country's native name`, () => {
    setup()
    expect(screen.getByLabelText('Native Name').textContent).toBe(
      getNativeNames(name.nativeName, languages).join(', ')
    )
  })

  it(`displays the country's population`, () => {
    setup()
    expect(screen.getByLabelText('Population').textContent).toBe(formatNumber(population))
  })

  it(`displays the country's region`, () => {
    setup()
    expect(screen.getByLabelText('Region').textContent).toBe(region)
  })

  it(`displays the country's subregion`, () => {
    setup()
    expect(screen.getByLabelText('Sub Region').textContent).toBe(subregion)
  })

  it(`displays the country's capital`, () => {
    setup()
    expect(screen.getByLabelText('Capital').textContent).toBe(capital?.join(', '))
  })

  it(`displays the country's top level domain`, () => {
    setup()
    expect(screen.getByLabelText('Top Level Domain').textContent).toBe(tld?.join(', '))
  })

  it(`displays the country's currencies`, () => {
    setup()
    expect(screen.getByLabelText('Currencies').textContent).toBe(
      Object.values(currencies)
        .map(({ name, symbol }) => `${name} (${symbol})`)
        ?.join(', ')
    )
  })

  it(`displays the country's languages`, () => {
    setup()
    expect(screen.getByLabelText('Languages').textContent).toBe(
      Object.values(languages)?.join(', ')
    )
  })

  it(`displays the country's borders`, () => {
    setup()
    const borderCountries = screen.getAllByLabelText('Border Countries:')

    borderCountries.forEach((borderCountry, index) => {
      expect(borderCountry.textContent).toBe(borderObj[index].name)
    })
  })

  it(`displays the "No border countries" if there's no border countries`, () => {
    render(<CountryDetail borders={undefined} />)
    const borderCountries = screen.getAllByLabelText('Border Countries:')

    expect(borderCountries.length).toBe(1)
    expect(borderCountries[0].textContent).toBe('No border countries')
  })

  it('displays skeleton loading', async () => {
    render(<CountryDetail isLoading />)
    expect(screen.getByTestId('country-detail-skeleton')).toBeInTheDocument()
  })
})
