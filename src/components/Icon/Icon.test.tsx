import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Icon from './Icon'

describe('Icon component', () => {
  it('displays the appropriate icon based on its name', () => {
    const iconName = 'search'

    render(<Icon name={iconName} />)

    expect(screen.getByTestId(`icon-${iconName}`)).toBeInTheDocument()
  })
})