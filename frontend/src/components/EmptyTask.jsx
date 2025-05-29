import React from 'react'
import { TiTick } from 'react-icons/ti'
import { FaStarOfLife } from 'react-icons/fa'
import { LuTarget } from 'react-icons/lu'
import { FaArrowUp } from 'react-icons/fa'
import { FaLightbulb } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'

function EmptyTask() {
  return (
    <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-500">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-yellow-800 bg-opacity-10 rounded-full"></div>

            <div className="absolute inset-0 flex items-center justify-center gray-100 text-5xl font-bold">
              <TiTick />
            </div>

            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
              <FaPlus />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              <FaStarOfLife />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-100">
            Add your first task
          </h3>
          <p className="text-gray-200 leading-relaxed">
            Start organizing your day by adding tasks above.
            <br />
            Stay productive and track your progress!
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <span className="text-red-700 font-bold">
              <FaLightbulb />
            </span>
            <span>Tip: Press Enter to quickly add tasks</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <span className="text-yellow-300 font-bold">
              <LuTarget />
            </span>
            <span>Set priorities to stay focused</span>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-800 bg-opacity-10 gray-100 rounded-lg">
            <span className="font-bold">
              <FaArrowUp />
            </span>
            <span className="text-sm font-medium">
              Use the input field above
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyTask
