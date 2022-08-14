import { useState } from 'react'

const useDarkMode = (defaultValue: boolean = false): [boolean, () => void] => {
  // Get darkMode data from localStorage
  const isDarkModeInLocalStorage: string | null = localStorage.getItem('isDarkMode')

  // Get darkMode data from browser theme
  const isDarkModeInBrowserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

  // Determine default value
  const defaultDarkModeValue: boolean =
    (isDarkModeInLocalStorage && JSON.parse(isDarkModeInLocalStorage)) ??
    isDarkModeInBrowserTheme ??
    defaultValue

  // isDarkMode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultDarkModeValue)

  // Toggling isDarkMode
  const handleToggleDarkMode = () => {
    const newValue = !isDarkMode

    // Set isDarkMode state
    setIsDarkMode(newValue)

    // Store new isDarkMode value to localStorage
    localStorage.setItem('isDarkMode', JSON.stringify(newValue))
  }

  return [isDarkMode, handleToggleDarkMode]
}

export default useDarkMode
