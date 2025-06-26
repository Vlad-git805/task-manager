import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default DashboardPage