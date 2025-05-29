import React, { useState } from 'react'
import TaskItem from './TaskItem'
import { FiSearch } from 'react-icons/fi'

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
}) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.completed
      case 'completed':
        return task.completed
      default:
        return true
    }
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-gray-800 rounded-lg p-4 border border-gray-500">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-200">Filter:</span>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All', count: totalCount },
              {
                key: 'active',
                label: 'Active',
                count: totalCount - completedCount,
              },
              { key: 'completed', label: 'Completed', count: completedCount },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 ${
                  filter === key
                    ? 'bg-yellow-700 text-white'
                    : 'bg-gray-700 gray-400 hover:text-gray-300 hover:bg-opacity-80'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-200">Progress</span>
            <span className="text-sm text-gray-400">
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-500">
            <FiSearch className="mx-auto text-3xl text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-400">
              {filter === 'active' && 'hey, Want try Some More Task !!!'}
              {filter === 'completed' && 'Hurry Up!! Complete Your Tasks...'}
              {filter === 'all' && 'sorry for the Error'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={() => onToggleTask(task._id)}
              onDelete={() => onDeleteTask(task._id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
