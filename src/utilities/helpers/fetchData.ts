interface HttpResponse<T> extends Response {
  parsedBody?: T
}

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response: HttpResponse<T> = await fetch(url)
    const data = await response.json()

    if (!response.ok) throw new Error(`Error fetching (${response.statusText})`)

    return data
  } catch (error) {
    throw error
  }
}

export default fetchData
