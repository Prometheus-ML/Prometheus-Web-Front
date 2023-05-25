export default (url, options) => {
  return useFetch(url, {
    baseURL: `${import.meta.env.VITE_API_URL}`,
    credentials: 'include',
    ...options
  })
}