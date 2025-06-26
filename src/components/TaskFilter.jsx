import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../features/tasks/taskSlice'

const TaskFilter = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.tasks.filter)

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter))
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <button
        onClick={() => handleFilterChange('all')}
        style={{ fontWeight: currentFilter === 'all' ? 'bold' : 'normal' }}
      >
        Усі
      </button>{' '}
      <button
        onClick={() => handleFilterChange('active')}
        style={{ fontWeight: currentFilter === 'active' ? 'bold' : 'normal' }}
      >
        Активні
      </button>{' '}
      <button
        onClick={() => handleFilterChange('completed')}
        style={{ fontWeight: currentFilter === 'completed' ? 'bold' : 'normal' }}
      >
        Виконані
      </button>
    </div>
  )
}

export default TaskFilter