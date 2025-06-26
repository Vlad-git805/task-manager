import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/taskSlice'

const TaskForm = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '') return // 

    const newTask = {
      id: Date.now(), 
      title: title,
      completed: false,
    }

    dispatch(addTask(newTask))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Нова задача"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  )
}

export default TaskForm