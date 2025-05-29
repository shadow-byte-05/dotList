import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [page, setPage] = useState(params.state)
  const [formData, setFormData] = useState({
    identifier: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [registerState, setRegisterState] = useState(page === 'Sign-up')
  const [loginState, setLoginState] = useState(page === 'log-in')

  const handleLoginClick = (e) => {
    e.preventDefault()
    setPage('Log-in')
    setLoginState(true)
    setRegisterState(false)
  }

  const handleRegisterClick = (e) => {
    e.preventDefault()
    setPage('Sign-up')
    setRegisterState(true)
    setLoginState(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = loginState
      ? {
          identifier: formData.identifier,
          password: formData.password,
        }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }

    const url = loginState
      ? 'http://localhost:8000/api/v1/user/login'
      : 'http://localhost:8000/api/v1/user/register'

    try {
      const res = await axios.post(url, payload, { withCredentials: true })
    
      navigate('/home')
    } catch (err) {
      console.error('Axios error:', err)
      alert(
        err.response?.data?.message || 'Server error. Please try again later.'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 ">
      <form
        className="bg-gray-700 p-8 rounded-xl shadow-md w-full max-w-sm relative"
        onSubmit={handleSubmit}
      >
        <Link
          to="/"
          className="bg-yellow-600 rounded-md p-1 absolute top-4 left-3 hover:bg-yellow-700 px-2"
        >
          <IoIosArrowRoundBack className="text-xl" />
        </Link>
        <h2 className="text-gray-200 text-2xl font-bold mb-1 text-center transition">
          {page}
        </h2>
        <div className="h-1 w-10  bg-gradient-to-r from-yellow-500 to-red-600  m-auto rounded-full mb-4"></div>

        <div className="flex justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={handleLoginClick}
            className={`w-1/2 font-semibold py-2 px-4 rounded-md transition duration-300 ${
              loginState
                ? ' bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700'
                : ' bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            className={`w-1/2 font-semibold py-2 px-4 rounded-md transition duration-300 ${
              registerState
                ? ' bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700'
                : ' bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent'
            }`}
          >
            Register
          </button>
        </div>

 
        {loginState ? (
          <div className="relative mb-4">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            />
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="text-gray-300 pl-10 w-full py-2 border gray-500-300 rounded-md focus:outline-none focus:border-2 focus:border-yellow-600"
            />
          </div>
        ) : (
          <>
            <div className="relative mb-4">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="text-gray-300 pl-10 w-full py-2 border gray-500-300 rounded-md focus:outline-none focus:border-2 focus:border-yellow-600"
              />
            </div>

            <div className="relative mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-gray-300 pl-10 w-full py-2 border gray-500-300 rounded-md focus:outline-none focus:border-2 focus:border-yellow-600"
              />
            </div>
          </>
        )}

        <div className="relative mb-4">
          <FontAwesomeIcon
            icon={faLock}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="text-gray-300 pl-10 w-full py-2 border gray-500-300 rounded-md focus:outline-none focus:border-2 focus:border-yellow-600"
          />
        </div>

        {!loginState && (
          <div className="relative mb-6">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="text-gray-300 pl-10 w-full py-2 border gray-500-300 rounded-md focus:outline-none focus:border-2 focus:border-yellow-600"
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords must match
                </p>
              )}
          </div>
        )}

        <button
          type="submit"
          className="w-full text-white font-semibold py-2 px-4 rounded-md  mb-4  bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {page}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
