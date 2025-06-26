import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, toggleComplete } from '../features/tasks/taskSlice'

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks) // Отримуємо задачі з Redux
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Список задач</h2>
      {tasks.length === 0 && <p>Немає жодної задачі</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
            <button onClick={() => dispatch(toggleComplete(task.id))}>
              {task.completed ? '↩️ Відмінити' : '✅ Завершити'}
            </button>
            <button onClick={() => dispatch(deleteTask(task.id))}>🗑️ Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList