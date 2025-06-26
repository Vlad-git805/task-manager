import { createSlice } from '@reduxjs/toolkit'

const savedTasks = localStorage.getItem('tasks')
const initialState = {
  tasks: savedTasks ? JSON.parse(savedTasks) : [],
}

const saveToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

const taskSlice = createSlice({
  name: 'tasks', 
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      saveToLocalStorage(state.tasks)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      saveToLocalStorage(state.tasks)
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        saveToLocalStorage(state.tasks)
      }
    },
  },
})


export const { addTask, deleteTask, toggleComplete } = taskSlice.actions

export default taskSlice.reducer