import TextInput from 'components/TextInput'

import './SearchBar.style.scss'

type SearchBarProps = {
  className?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

const SearchBar = ({ value, onChange: changeHandler = () => {}, ...props }: SearchBarProps) => {
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement

    changeHandler(element.value)
  }

  const handleClearSearch = () => {
    changeHandler('')
  }

  return (
    <TextInput
      name='search-bar'
      value={value}
      onChange={handleSearch}
      iconLeft={{
        name: 'search',
        className: 'search-bar__search-icon'
      }}
      iconRight={
        value
          ? {
              name: 'close',
              className: 'search-bar__close-icon',
              onClick: handleClearSearch
            }
          : undefined
      }
      autoComplete='off'
      {...props}
    />
  )
}

export default SearchBar
