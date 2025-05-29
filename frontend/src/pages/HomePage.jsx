import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import TaskInput from '../components/TaskInput.jsx'
import TaskList from '../components/TaskList.jsx'
import EmptyTask from '../components/EmptyTask.jsx'

import { useUser } from '../Contexts/userContext.jsx'
import { IoMdRefresh } from 'react-icons/io'
import api from '../Contexts/api.jsx'
import Footer from '../components/footer.jsx'

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingTask, setIsAddingTask] = useState(false)

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const response = await api.get('/tasks')
        setTasks(response.data) 
      } catch (err) {
        console.error('Failed to load tasks:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])
  


  useEffect(() => {
    if (!isLoading && tasks.length >= 0) {
      localStorage.setItem('todoTasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = async (taskText) => {
    if (!taskText.trim()) return
    setIsAddingTask(true)
    try {
      const response = await api.post('/tasks', {
        text: taskText,
        completed: false,
      })
      console.log('Added task:', response.data) 
      setTasks((prev) => [response.data, ...prev]) 
    } catch (err) {
      console.error('Error adding task:', err)
      alert('Failed to add task.')
    } finally {
      setIsAddingTask(false)
    }
  }
  
  
  const toggleTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId)
      const response = await api.patch(`/tasks/${taskId}`, {
        completed: !task.completed,
      })
      console.log('Updated task:', response.data) 
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? response.data : t))
      )
    } catch (err) {
      console.error('Error toggling task:', err)
    }
  }
  
  
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }
  
  
  

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16 change-color">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">My Tasks</h1>
            <p className="text-gray-200">
              {tasks.length === 0
                ? 'No tasks yet. Add your first task below!'
                : `${tasks.filter((task) => !task.completed).length} of ${
                    tasks.length
                  } tasks remaining`}
            </p>
          </div>

          <div className="mb-8">
            <TaskInput onAddTask={addTask} isLoading={isAddingTask} />
          </div>

          
          {tasks.length === 0 ? (
            <EmptyTask />
          ) : (
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              isRefreshing={isLoading}
            />
          )}

          
        </div>
      </main>
      <Footer />
    </>
  )
}
export default HomePage
