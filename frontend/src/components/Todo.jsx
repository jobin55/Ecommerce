import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api.js'
import '../style/App.css'

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [selectedTodo, setSelectedTodo] = useState(null)

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      const data = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to load todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    try {
      const todo = await createTodo({ 
        title: newTodo.title.trim(),
        description: newTodo.description.trim() || null
      })
      setTodos(prev => [todo, ...prev])
      setNewTodo({ title: '', description: '' })
    } catch (error) {
      console.error('Failed to create todo:', error)
      alert(error.message)
    }
  }

  const handleToggleComplete = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, {
        ...todo,
        is_completed: !todo.is_completed,
      })
      setTodos(prev => prev.map((t) => (t.id === todo.id ? updated : t)))
      if (selectedTodo?.id === todo.id) {
        setSelectedTodo(updated)
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(prev => prev.filter((t) => t.id !== id))
      if (selectedTodo?.id === id) {
        setSelectedTodo(null)
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const handleBack = () => {
    setSelectedTodo(null)
  }

  return (
    <div className="todo-app">
      <header className="todo-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
          <h1>Todo App</h1>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            Home
          </Link>
        </div>
        <p>Manage your tasks efficiently</p>
      </header>

      <div className="todo-container">
        <div className="todo-list-section">
          <form className="todo-form" onSubmit={handleAddTodo}>
            <input
              type="text"
              className="todo-input"
              placeholder="Add a title..."
              value={newTodo.title}
              onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              className="todo-textarea"
              placeholder="Add a description (optional)..."
              value={newTodo.description}
              onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
            />
            <button type="submit" className="add-button" disabled={!newTodo.title.trim()}>
              Add
            </button>
          </form>

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos yet. Add one above!</p>
            </div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li 
                  key={todo.id} 
                  className={`todo-item ${selectedTodo?.id === todo.id ? 'selected' : ''}`}
                  onClick={() => handleSelectTodo(todo)}
                >
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.is_completed}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleToggleComplete(todo)
                    }}
                  />
                  <span className={`todo-title ${todo.is_completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="todo-detail-section">
          {selectedTodo ? (
            <div className="todo-detail">
              <div className="todo-detail-header">
                <span className={`todo-status ${selectedTodo.is_completed ? 'completed' : ''}`}>
                  {selectedTodo.is_completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              <h2 className="todo-detail-title">{selectedTodo.title}</h2>
              <p className="todo-detail-description">
                {selectedTodo.description || 'No description provided.'}
              </p>
              <div className="todo-detail-actions">
                <button 
                  className="back-button" 
                  onClick={handleBack}
                >
                  ← Back to List
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteTodo(selectedTodo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="todo-empty-detail">
              <p>Select a todo to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
