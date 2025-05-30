// src/pages/landing-page/components/Navigation.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiTarget } from 'react-icons/fi'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-gray-500 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center fade-in-down">
            <Link
              to="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded-md p-1 transition-transform duration-200 hover:scale-105"
            >
              <div className="w-8 h-8  flex items-center justify-center shadow-lg">
                <FiTarget  />
              </div>
              <span className="text-xl font-bold text-gray-100">dotList</span>
            </Link>
          </div>

          <div className="md:flex items-center space-x-4 fade-in-down">
            <Link
              to="/user/log-in"
              className="text-sm font-medium text-gray-200 hover:text-gray-50
              hover:border hover:border-yellow-500 transition-colors duration-200  focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded-md px-3 py-2 "
            >
              Sign In
            </Link>
            <Link to="/user/Sign-up">
              <button className="text-white text-sm font-medium px-4 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 fade-in-down">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
