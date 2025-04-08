import axiosInstance from '../utils/axiosInstance'

interface LoginCredentials {
    email: string
    password: string
}

interface SignupCredentials {
    username: string
    email: string
    password: string
}

interface AuthResponse {
    message: string
    error: string | null
    data: {
        name: string
        email: string
        role: string
    }
}

const authService = {
    login: async ({ email, password }: LoginCredentials) => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', {
            email,
            password,
        })

        return response
    },

    signup: async ({ username, email, password }: SignupCredentials) => {
        const response = await axiosInstance.post<AuthResponse>('/auth/signup', {
            username,
            email,
            password,
        })

        return response
    },
}

export default authService
