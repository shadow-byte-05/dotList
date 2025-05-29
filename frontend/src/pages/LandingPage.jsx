import React, { useEffect } from 'react'
import Navigation from '../components/Navigation.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/footer.jsx'

function LandingPage() {
  window.scrollTo({ top: 0, behavior: 'smooth' })



  return (
    <>
          <Navigation/>
          <Hero/>
          <Footer/>
    </>
  
  )
}

export default LandingPage
