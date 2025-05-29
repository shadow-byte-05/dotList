import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function UserRegistrationScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const mockCredentials = {
    existingEmail: 'test@example.com',
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePassword = (password) => password.length >= 8

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    if (apiError) setApiError('')
  }

  const simulateApiCall = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email === mockCredentials.existingEmail) {
          return reject(new Error('An account with this email already exists'))
        }
        if (Math.random() < 0.1) {
          return reject(
            new Error(
              'Network error. Please check your connection and try again.'
            )
          )
        }
        if (Math.random() < 0.05) {
          return reject(new Error('Server error. Please try again later.'))
        }
        resolve({
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: Date.now(),
            email: userData.email,
            createdAt: new Date().toISOString(),
          },
        })
      }, 2000)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setApiError('')

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await simulateApiCall({
        email: formData.email,
        password: formData.password,
      })

      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      console.log('Registration successful! Redirecting to todo list...')

      setFormData({ email: '', password: '', confirmPassword: '' })
      setIsSubmitted(false)
    } catch (error) {
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword
    )
  }

  return (
    <div
      className="max-w-md mx-auto p-6 bg-gray-800 border
    border-gray-500 shadow-md rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-200">
        Create Account
      </h2>
      <p className="text-sm text-center text-gray-300 mb-6">
        Join us to start organizing your tasks
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{apiError}</div>
        )}

        <div>
          <label className="block mb-2 font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded bg-gray-800 border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            disabled={isLoading}
            required
          />
          {isSubmitted && errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            className="block mb-2 font-medium text-gray-300 
          "
          >
            Password
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded bg-gray-800 border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange('password')}
            disabled={isLoading}
            required
          />
          {isSubmitted && errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded bg-gray-800 border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            disabled={isLoading}
            required
          />
          {isSubmitted && errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className="w-full py-2 text-white font-semibold rounded-md transition-colors duration-300 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>

        <div className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link
            to="/login-screen"
            className="text-indigo-700 hover:text-indigo-600"
          >
            Sign in here
          </Link>
        </div>

        <div className="mt-6 p-4 border gray-500-300 rounded bg-gray-50 text-xs text-gray-600">
          <p className="font-medium mb-1">For testing purposes:</p>
          <p>• Use any email except: {mockCredentials.existingEmail}</p>
          <p>• Password must be 8+ characters</p>
          <p>• Form validates in real-time</p>
        </div>
      </form>
    </div>
  )
}

export default UserRegistrationScreen
