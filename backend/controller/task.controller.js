import Task from '../models/task.model.js'


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}


export const createTask = async (req, res) => {
  const { text, priority } = req.body
  try {
    const newTask = await Task.create({
      text,
      user: req.user._id,
    })
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).json({ error: 'Invalid task data' })
  }
}


export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) return res.status(404).json({ error: 'Task not found' })

    task.completed = !task.completed
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!task) return res.status(404).json({ error: 'Task not found' })

    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}


