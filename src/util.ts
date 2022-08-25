import fetch from 'node-fetch'
import { parse } from 'csv-parse'

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn/${url}`)
    const buffer = await response.text()
    return new Promise<string[][]>(resolve => {
      parse(buffer, (error, res) => {
        if (error) {
          console.error(error)
          return []
        }
        resolve(res)
      })
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
