// src/pages/landing-page/components/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/loginPage.css'
import { FaArrowRight } from 'react-icons/fa6'
import { TiTick } from 'react-icons/ti'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { FaMobile } from 'react-icons/fa'
import { SiTicktick } from 'react-icons/si'
import { FaClock } from 'react-icons/fa6'
import { FaFlag } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa'
import { GoGraph } from 'react-icons/go'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8  overflow-hidden fade-in-up">
      <div className="absolute inset-0  opacity-10 change-color" />

      <div className="relative max-w-7xl mx-auto text-center sm:mt-10">
        <div className="max-w-4xl mx-auto sm:pt-24 md:pt-32 pt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 mb-6 leading-tight ">
            <span className="block fade-in-up-1">
              Busy &nbsp;
              <span className=" bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent fade-in-up-2">
                Managing &nbsp;
              </span>
              Your Task,
            </span>
            <span className="block bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent fade-in-up-2 mt-2">
              Try dotList
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-roboto mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of simplicity and power,
            <span className=" bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent fade-in-up-2 mt-2">
              &nbsp;dotList&nbsp;
            </span>
            helps you manage tasks, stay organized, and boost productivity
            across all your devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/user/Sign-up">
              <button className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center rounded-xl ">
                Get Started Free
                <FaArrowRight className="ml-2.5" />
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <TiTick />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <RiSecurePaymentFill />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMobile />
              <span>Works everywhere</span>
            </div>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md border border-gray-500 rounded-2xl p-8 shadow-2xl">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-800 rounded-md flex items-center justify-center text-white text-xs font-bold">
                      <SiTicktick />
                    </div>
                    <span className="font-semibold ">dotList</span>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="w-3 h-3 bg-red-600 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-600 rounded-full" />
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div
                    className="flex items-center gap-2
                   p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="w-4 h-4 bg-success rounded border-2 border-green-600 flex items-center justify-center text-white text-[10px] font-bold">
                      <TiTick />
                    </div>
                    <span className="text-gray-100 line-through opacity-75">
                      Complete project proposal
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-4 h-4 rounded border-2 gray-500-600" />
                    <span>Review team feedback</span>
                    <span className="ml-auto text-ms text-red-700 flex items-center">
                      <FaClock className="mr-2" />
                      Today
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-4 h-4 rounded border-2 gray-500-600" />
                    <span>Prepare presentation slides</span>
                    <span className="ml-auto text-ms text-yellow-600 flex items-center">
                      <FaFlag className="mr-2" />
                      High
                    </span>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="absolute -top-4 -left-4 bg-yellow-800 bg-opacity-20 backdrop-blur-md rounded-lg p-4 border gray-500-400 border-opacity-30">
              <FaBell className="text-yellow-500 text-xl " />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-success bg-opacity-20 backdrop-blur-md rounded-lg p-4 border border-green-700 border-opacity-30">
              <GoGraph className="text-green-700 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
