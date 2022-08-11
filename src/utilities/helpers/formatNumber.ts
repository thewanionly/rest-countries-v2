/**
 * Formats number depending on locale
 */
const formatNumber = (value: number, locale: string = navigator.language): string =>
  new Intl.NumberFormat(locale).format(value)

export default formatNumber
