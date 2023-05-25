export const useGlobalFetch = (url, options) => useFetch(url, {
    baseURL: `${import.meta.env.VITE_API_URL}`,
    credentials: 'include',
    ...options
})