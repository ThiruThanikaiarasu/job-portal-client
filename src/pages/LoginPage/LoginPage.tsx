import { useForm } from 'react-hook-form'
import authService from '../../services/authService'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type LoginFormData = {
    email: string
    password: string
}

const LoginPage = () => {

    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

    const onSubmit = (data: LoginFormData) => {
        setIsSubmitting(true)
        authService.login(data)
            .then((response) => {
                if (response.status === 200) {
                    const user = response.data.data 
                    
                    localStorage.setItem('userData', JSON.stringify([user]))
                    localStorage.setItem('isUserLoggedIn', 'true')
                    
                    navigate('/')
                }
            })
            .catch((error: AxiosError<any>) => {            
                const status = error.response?.status
                const message = error.response?.data?.message ?? 'An error occurred'
                const errorCode = error.response?.data?.error 
            
                if (status === 401 && errorCode == 'invalid_email') {
                    toast.error('Invalid Email, try to create account')
                } else if (status === 401 && errorCode == 'invalid_password') {
                    toast.error('Incorrect password')
                } else if (status === 500) {
                    toast.error('Server error, please try again later')
                } else if (status) {
                    toast.error(`Error ${status}: ${message}`)
                } else if (error.request) {
                    toast.error('Network error. Please check your connection and try again.')
                } else {
                    toast.error('Unexpected error occurred. Please try again later.')
                }
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    const toggleForm = () => {
        navigate('/signup')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-purple-700">Login</h1>
                    <p className="text-gray-600 mt-2">Welcome back!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="text-purple-700 hover:text-purple-800 font-bold focus:outline-none"
                            onClick={toggleForm}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
