export const getToken = (ID_TOKEN_KEY) => {
  return window.localStorage.getItem(ID_TOKEN_KEY) || null
}

export const saveToken = (ID_TOKEN_KEY, token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const destroyToken = (ID_TOKEN_KEY) => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

export default {
  getToken,
  saveToken,
  destroyToken,
}