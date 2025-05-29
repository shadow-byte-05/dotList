import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'


const UserContext = createContext()


export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/user/currentUser',
          {
            withCredentials: true, 
          }
        )
        setUser(response.data)
      } catch (err) {
        setUser(null) 
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
