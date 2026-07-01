const BASE_URL = import.meta.env.VITE_API_URL

const api = (endpoint: string, method: string = "GET", content: object = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...(method === "GET" ? {} : { body: JSON.stringify(content) })
  })
}

export default api