import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { LuTarget } from 'react-icons/lu'
import api from '../Contexts/api'

import { useUser } from '../Contexts/userContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, setUser, loading } = useUser()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const onLogout = async () => {
    try {
      const res = await api.post('/logout', {
        withCredentials: true,
      })
      

      if (!res.data.success) {
        console.log(res.data.message)
        
        return
      }

      navigate('/')
      setUser(null)
      
    } catch (error) {
      console.log(error)
    }
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev)
  }

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
              <LuTarget />
              <span className="text-xl font-bold text-gray-100">dotList</span>
            </Link>
          </div>

          {!loading && user && (
            <div className="relative flex items-center space-x-4 fade-in-down gap-4">
              <span className="text-white">Hey, {user.username}</span>

              <div className="relative flex">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center justify-center text-white text-sm font-medium px-4 py-2 h-12 w-12 rounded-full bg-gradient-to-r from-yellow-600 to-red-400 hover:from-red-500 hover:to-yellow-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <FaUserAlt />
                </button>

                <button onClick={toggleUserMenu}>
                  <RiArrowDropDownLine className="text-3xl text-white cursor-pointer" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-12 mt-2  w-40 bg-transparent rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={onLogout}
                      className="block w-full  px-1 py-2 text-center rounded-3xl bg-red-700 text-gray-100 hover:bg-red-800 "
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
