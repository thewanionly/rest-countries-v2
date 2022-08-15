import { createContext, useCallback, useState } from 'react'

import { INITIAL_ITEMS, PAGE_LIMIT } from '../utilities/constants'

type StoreProviderProps = {
  children: React.ReactNode
}

export type StoreContextValue = {
  searchTerm: string
  handleSearchTerm: (value: string) => void
  filterValue: string
  handleFilterValue: (value: string) => void
  limit: number
  handleIncreaseLimit: () => void
}

export const initialStoreValue = {
  searchTerm: '',
  handleSearchTerm: (value: string) => {},
  filterValue: '',
  handleFilterValue: (value: string) => {},
  limit: INITIAL_ITEMS,
  handleIncreaseLimit: () => {}
}

const StoreContext = createContext<StoreContextValue>(initialStoreValue)

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [limit, setLimit] = useState(INITIAL_ITEMS)

  const handleSearchTerm = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleFilterValue = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  const handleIncreaseLimit = useCallback(() => {
    setLimit((prevLimit) => prevLimit + PAGE_LIMIT)
  }, [])

  const value = {
    searchTerm,
    handleSearchTerm,
    filterValue,
    handleFilterValue,
    limit,
    handleIncreaseLimit
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export { StoreContext }

export default StoreProvider
