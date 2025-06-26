import { createSlice } from '@reduxjs/toolkit'

const savedTasks = localStorage.getItem('tasks')
const initialState = {
  tasks: savedTasks ? JSON.parse(savedTasks) : [],
  filter: 'all',
}

const saveToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

const taskSlice = createSlice({
  name: 'tasks', 
  initialState,
  reducers: {
    addTask: (state, action) => {
        const newTask = {
          id: Date.now(),
          title: action.payload.title,
          completed: false,
          dueDate: action.payload.dueDate || null,
          category: action.payload.category || 'Загальні',
       };
      state.tasks.push(newTask);
      saveToLocalStorage(state);
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
    reorderTasks: (state, action) => {
        const { sourceIndex, destinationIndex } = action.payload
        const tasks = [...state.tasks]
        const [movedTask] = tasks.splice(sourceIndex, 1)
        tasks.splice(destinationIndex, 0, movedTask)
        state.tasks = tasks
        saveToLocalStorage(state.tasks)
    },
    setFilter: (state, action) => {
        state.filter = action.payload
    },
    reorderTasksWithinCategory: (state, action) => {
        const { category, startIndex, endIndex } = action.payload;
  
        const categoryTasks = state.tasks.filter(t => (t.category || 'Загальні') === category);
        const taskIdsInCategory = categoryTasks.map(t => t.id);
  
        const globalIndexes = state.tasks
          .map((t, i) => ({ ...t, index: i }))
          .filter(t => taskIdsInCategory.includes(t.id));
  
        const from = globalIndexes[startIndex].index;
        const to = globalIndexes[endIndex].index;
  
        const [moved] = state.tasks.splice(from, 1);
        state.tasks.splice(to, 0, moved);
        saveToLocalStorage(state.tasks)
      },
  
    moveTaskBetweenCategories: (state, action) => {
        const { sourceCategory, destinationCategory, sourceIndex, destinationIndex } = action.payload;
  
        const sourceTasks = state.tasks.filter(t => (t.category || 'Загальні') === sourceCategory);
        const destinationTasks = state.tasks.filter(t => (t.category || 'Загальні') === destinationCategory);
  
        const taskToMove = sourceTasks[sourceIndex];
  
        const removeIndex = state.tasks.findIndex(t => t.id === taskToMove.id);
        state.tasks.splice(removeIndex, 1);
  
        const updatedTask = { ...taskToMove, category: destinationCategory };
  
        const targetIndexes = state.tasks
          .map((t, i) => ({ ...t, index: i }))
          .filter(t => (t.category || 'Загальні') === destinationCategory);
  
        const insertIndex = targetIndexes[destinationIndex]?.index ?? state.tasks.length;
        state.tasks.splice(insertIndex, 0, updatedTask);
        saveToLocalStorage(state.tasks)
    },
    editTask: (state, action) => {
        const { id, updates } = action.payload;
        const task = state.tasks.find((t) => t.id === id);
        if (task) {
          task.title = updates.title;
          task.dueDate = updates.dueDate;
          task.category = updates.category;
        }
        saveToLocalStorage(state.tasks);
    },
  },
})


export const { 
    addTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    setFilter, 
    reorderTasksWithinCategory,
    moveTaskBetweenCategories,
    editTask,
} = taskSlice.actions


export default taskSlice.reducer