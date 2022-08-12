import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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

    expect(screen.getByTestId('detail-page')).toBeInTheDocument()
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
