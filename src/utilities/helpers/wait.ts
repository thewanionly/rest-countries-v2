/**
 * Promisifed setTimeout
 */
const wait = (sec: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second. Please try again.`))
    }, sec * 1000)
  })
}

export default wait
