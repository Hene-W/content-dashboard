import api from "./api"

export const loginService = async (email: string, password: string): Promise<any> => {
    const response = await api("/auth/login", "POST", { email, password })
    const data = await response.json()
    return data.data
}

export const logoutService = async (): Promise<any> => {
    const response = await api("/auth/logout", "POST")
    const data = await response.json()
    return data.message
}

export const getMeService = async (): Promise<any> => {
    const response = await api(`/auth/me`, "GET")
    const data = await response.json()
    return data.data
}

export const updateEmailService = async (newEmail: string): Promise<any> => {
    const response = await api("/auth/updateEmail", "PATCH", { newEmail })
    const data = await response.json()
    return data.data
}

export const changePasswordService = async (oldPassword: string, newPassword: string): Promise<any> => {
    const response = await api("/auth/changePassword", "PATCH", { oldPassword, newPassword })
    const data = await response.json()
    return data.data
}