/**
 * Converts first letter of a string to uppercase
 */
const titleCase = (str: string): string => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

export default titleCase
