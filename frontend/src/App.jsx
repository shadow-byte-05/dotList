
import { Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LandingPage from './pages/LandingPage.jsx'


function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/user/:state" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      
    </Routes>
  )
}

export default App
