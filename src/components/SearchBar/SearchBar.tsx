import TextInput from '../TextInput'
import './SearchBar.style.scss'

type SearchBarProps = {
  className?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

const SearchBar = ({ onChange: changeHandler = () => {}, ...props }: SearchBarProps) => {
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement

    changeHandler(element.value)
  }

  return <TextInput name='search-bar' onChange={handleSearch} {...props} />
}

export default SearchBar
