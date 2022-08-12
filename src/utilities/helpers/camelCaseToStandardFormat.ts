import titleCase from './titleCase'

/**
 * converts "camelCase" to "Standard Format"
 */
const camelCaseToStandardFormat = (value: string, separator = ' '): string => {
  if (!value) return value

  return titleCase(value.split(/(?=[A-Z])/).join(separator))
}

export default camelCaseToStandardFormat
