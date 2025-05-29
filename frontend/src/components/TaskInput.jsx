import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

function TaskInput({ onAddTask, isLoading }) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskText.trim() && !isLoading) {
      onAddTask(taskText)
      setTaskText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center space-x-3 bg-gray-800 rounded-lg border border-gray-500 p-4 focus-within:border-yellow-700 duration-200">
        <div className="flex-1">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="w-full bg-transparent gray-100 placeholder-gray-400 focus:outline-none text-base"
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          disabled={!taskText.trim() || isLoading}
          className="flex items-center justify-center w-10 h-10 bg-yellow-700 hover:bg-yellow-800 disabled:bg-opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <IoMdAdd className="text-white" />
          )}
        </button>
      </div>
    </form>
  )
}

export default TaskInput
