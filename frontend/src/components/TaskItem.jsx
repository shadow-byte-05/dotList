import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";
import { FaTrash } from 'react-icons/fa'

function TaskItem({ task, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task._id)
    setIsDeleting(false)
    setShowDeleteConfirm(false)
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const formatDate = (date) => {
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div
      className={`bg-gray-800 border border-gray-500 rounded-lg p-4 transition-all duration-200 hover:border-yellow-800 hover:border-opacity-50 ${
        task.completed ? 'bg-opacity-50' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-700 border-green-600'
                : 'border-gray-500 hover:border-yellow-800'
            }`}
          >
            {task.completed && <TiTick />}
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p
                className={`text-base break-words transition-all duration-200 ${
                  task.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-100'
                }`}
              >
                {task.text}
              </p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">
                    {formatDate(new Date(task.createdAt))}
                  </span>
                </div>
              </div>
            </div>

       
            <div className="flex items-center space-x-2 ml-4">
              {!showDeleteConfirm ? (
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded"
                >
                  <FaTrash />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancelDelete}
                    className="px-2 py-1 text-xs bg-gray-700 text-gray-200 hover:text-gray-100 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-2 py-1 text-xs bg-red-600 hover:bg-opacity-80 text-white rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <div className="flex items-center space-x-1">
                        <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
