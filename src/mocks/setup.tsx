import { BrowserRouter as Router } from 'react-router-dom'

import { render, RenderOptions, RenderResult } from '@testing-library/react'

import StoreProvider from 'store/StoreProvider'

type RootWrapperProps = {
  children?: React.ReactNode
}

const RootWrapper = ({ children }: RootWrapperProps) => {
  return (
    <Router>
      <StoreProvider>{children}</StoreProvider>
    </Router>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: RootWrapper, ...options })

export * from '@testing-library/react'

export { customRender as render }
