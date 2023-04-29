import { useState, useEffect } from "react"

export const useFetch = (url) => {
  // fetch data state
  const [data, setData] = useState(null)
  // fetch load status
  const [isLoading, setIsLoading] = useState(false)
  // error status
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(url, { controller: controller.signal })
        // check response error 
        if (!res.ok) throw new Error(res.statusText)

        const json = await res.json()
        // update fetch status & fetch data
        setIsLoading(false)
        setData(json)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted!")
        } else {
          // update error
          setIsLoading(false)
          setError('Failed to retrieve data!')
          console.log(err.message)
        }
      }
    }

    fetchData()

    // fetch cleanup function
    return () => {
      // abort all async tasks associated with controller
      controller.abort()
    }
  }, [url])

  // return data state
  return { data, isLoading, error }
}

export default useFetch