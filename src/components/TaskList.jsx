import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, toggleComplete, reorderTasks, reorderTasksWithinCategory, moveTaskBetweenCategories, editTask} from '../features/tasks/taskSlice'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd'
import React, { useState } from 'react';



const TaskList = () => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        dueDate: '',
        category: '',
    });


    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditForm({
        title: task.title,
        dueDate: task.dueDate || '',
        category: task.category || '',
        });
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
    };

    const dispatch = useDispatch();

    const saveEdits = (taskId) => {
        dispatch(editTask({
        id: taskId,
        updates: {
            title: editForm.title,
            dueDate: editForm.dueDate,
            category: editForm.category,
        }
        }));
        setEditingTaskId(null);
    };

    const tasks = useSelector((state) => {
        const { tasks, filter } = state.tasks
        switch (filter) {
          case 'active':
            return tasks.filter(task => !task.completed)
          case 'completed':
            return tasks.filter(task => task.completed)
          default:
            return tasks
        }
    })

    const handleDragEnd = (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (source.droppableId === destination.droppableId) {
      // Переміщення в межах однієї категорії
      dispatch(reorderTasksWithinCategory({
        category: source.droppableId,
        startIndex: source.index,
        endIndex: destination.index,
      }));
    } else {
      // Переміщення між категоріями
      dispatch(moveTaskBetweenCategories({
        sourceCategory: source.droppableId,
        destinationCategory: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }));
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
        const key = task.category || 'Загальні';
        if (!acc[key]) acc[key] = [];
        acc[key].push(task);
        return acc;
    }, {});

    return (
        <div>
          <h2>Список задач</h2>
          {tasks.length === 0 && <p>Немає жодної задачі</p>}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
                {Object.entries(groupedTasks).map(([category, tasksInCategory]) => (
                <div key={category} >
                    <h3>{category}</h3>
                    <Droppable droppableId={category}>
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {tasksInCategory.map((task, index) => {
                            const isOverdue =
                            task.dueDate &&
                            !task.completed &&
                            new Date(task.dueDate) < new Date(new Date().toDateString());
        
                            return (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                    ...provided.draggableProps.style,
                                    padding: '8px',
                                    marginBottom: '4px',
                                    backgroundColor: isOverdue ? '#ffe5e5' : '#fff',
                                    border: isOverdue ? '1px solid red' : '1px solid gray',
                                    borderRadius: '4px',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    }}
                                >
                                    
                                    {editingTaskId === task.id ? (
                                    <>
                                        <div style={{ flex: 1 }}>
                                        <input
                                            type="text"
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            placeholder="Назва"
                                        />
                                        <input
                                            type="date"
                                            value={editForm.dueDate}
                                            onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            value={editForm.category}
                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                            placeholder="Категорія"
                                        />
                                        </div>
                                        <div>
                                        <button onClick={() => saveEdits(task.id)}>💾</button>
                                        <button onClick={cancelEditing}>❌</button>
                                        </div>
                                    </>
                                    ) : (
                                    <>
                                        <div style={{ flex: 1 }}>
                                        <div>{task.title}</div>
                                        {task.dueDate && (
                                            <small style={{ color: isOverdue ? 'red' : 'gray' }}>
                                            ⏰ до {task.dueDate}
                                            {isOverdue && ' (просрочено)'}
                                            </small>
                                        )}
                                        {task.category && (
                                            <div style={{ fontSize: '0.8em', color: 'gray' }}>📂 {task.category}</div>
                                        )}
                                        </div>
                                        <div>
                                        <button onClick={() => dispatch(toggleComplete(task.id))}>
                                            {task.completed ? '↩️' : '✅'}
                                        </button>
                                        <button onClick={() => startEditing(task)}>✏️</button>
                                        <button onClick={() => dispatch(deleteTask(task.id))}>🗑️</button>
                                        </div>
                                    </>
                                    )}
                                </li>
                                )}
                            </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>
                </div>
                ))}
            </div>
          </DragDropContext>
        </div>
    );
}

export default TaskList