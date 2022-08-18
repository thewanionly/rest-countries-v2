import '@testing-library/jest-dom'

import { render, screen } from 'mocks/setup'

import ErrorBoundary from './ErrorBoundary'

describe('Error Boundary', () => {
  it(`shows the error state component when there's an error`, () => {
    const ComponentWithError = () => {
      throw new Error()
    }

    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
  })
})
