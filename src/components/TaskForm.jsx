import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/taskSlice'

const TaskForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '') return // 

    const newTask = {
      id: Date.now(), 
      title: title,
      completed: false,
      dueDate: dueDate || null,
      category: category,
    }

    dispatch(addTask(newTask))
    setTitle('')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Нова задача..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Категорія / Проєкт"
      />
      {' '}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {' '}
      <button type="submit">Додати</button>
    </form>
  )
}

export default TaskForm