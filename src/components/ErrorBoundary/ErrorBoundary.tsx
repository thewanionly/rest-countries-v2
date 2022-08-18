import React, { Component } from 'react'

import EmptyState from 'components/EmptyState'

import './ErrorBoundary.style.scss'

interface ErrorBoundaryProps {
  children?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined
  }

  static getDerivedStateFromError(error: Error, errorInfo: React.ErrorInfo): ErrorBoundaryState {
    // Update the state when there's an error
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Do other sort of things when an error occurs e.g. logging the error
    if (typeof jest === 'undefined') {
      console.error('Something went wrong', error, errorInfo)
    }
  }

  render() {
    return this.state.hasError ? (
      <div className='error-boundary' data-testid='error-boundary'>
        <div className='container'>
          <EmptyState variant='error' primaryMessage='Something went wrong'>
            <p>{this.state.error?.message}</p>
            <p> Please check your console for more information.</p>
          </EmptyState>
        </div>
      </div>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
