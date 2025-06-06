import { useForm } from "react-hook-form"
import authService from "../../services/authService"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type SignupFormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const SignupPage = () => {

    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>()
    
    const onSubmit = (data: SignupFormData) => {
        setIsSubmitting(true)
        authService.signup(data)
            .then((response) => {
                if (response.status === 201) {
                    const user = response.data.data 
                    
                    localStorage.setItem('userData', JSON.stringify([user]))
                    localStorage.setItem('isUserLoggedIn', 'true')
                    
                    navigate('/')
                }
            })
            .catch((error: AxiosError<any>) => {
                const status = error.response?.status
                const message = error.response?.data?.message ?? 'An error occurred'
            
                if (status === 409) {
                    toast.error('User already exists. Login to continue')
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

    const password = watch('password')

    const toggleForm = () => {
        navigate('/login')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-purple-700">Sign Up</h1>
                    <p className="text-gray-600 mt-2">Create your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Choose a username"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters'
                                }
                            })}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                            Email
                        </label>
                        <input
                            id="signup-email"
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

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                            Password
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Create a password"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Confirm your password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="text-purple-700 hover:text-purple-800 font-bold focus:outline-none"
                            onClick={toggleForm}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage