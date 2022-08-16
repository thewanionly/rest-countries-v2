import '@testing-library/jest-dom'

import { render, screen } from 'mocks/setup'

import Icon from './Icon'

describe('Icon component', () => {
  it('displays the appropriate icon based on its name', () => {
    const iconName = 'search'

    render(<Icon name={iconName} />)

    expect(screen.getByTestId(`icon-${iconName}`)).toBeInTheDocument()
  })
})
