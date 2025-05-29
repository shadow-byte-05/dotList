import React from 'react'
import { FaLaptopCode } from 'react-icons/fa'

const footer = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-red-700 text-white w-full py-6 mt-3 rounded-t-md flex justify-center items-center shadow-lg">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        Made By ROUNAK <FaLaptopCode className="text-2xl" />
      </h2>
    </div>
  )
}

export default footer
