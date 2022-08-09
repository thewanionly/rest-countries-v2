import { createContext, useState } from 'react'

type StoreProviderProps = {
  children: React.ReactNode
}

export type StoreContextValue = {
  searchTerm: string
  handleSearchTerm: (value: string) => void
  filterValue: string
  handleFilterValue: (value: string) => void
}

export const initialStoreValue = {
  searchTerm: '',
  handleSearchTerm: (value: string) => {},
  filterValue: '',
  handleFilterValue: (value: string) => {}
}

const StoreContext = createContext<StoreContextValue>(initialStoreValue)

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleFilterValue = (value: string) => {
    setFilterValue(value)
  }

  const value = {
    searchTerm,
    handleSearchTerm,
    filterValue,
    handleFilterValue
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export { StoreContext }

export default StoreProvider
