import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import TaskFilter from '../components/TaskFilter'

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
  )
}

export default DashboardPage