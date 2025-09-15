import React, { useMemo, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

enum Status {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  const addTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    setTodos(prev => [
      ...prev,
      { id: Date.now(), title: newTodo.trim(), completed: false },
    ]);

    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => (
      prev.map(todo => (
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ))
    ));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })))
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const todosCompleted = todos.filter(todo => todo.completed).length;

  const todosActive = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>

      <input
        className="todoapp__input"
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add new task..."
      />

      <button className="todoapp__button" onClick={addTodo}>Add Todo</button>

      <ul className="todoapp__list">

        <input
          className="todoapp__checkbox"
          type="checkbox"
          onChange={toggleAll}
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          id="toggleAll"
        />
        <label className="todoapp__label" htmlFor="toggleAll">Toggle All</label>

        {visibleTodos.map(todo => (
          <li className="todoapp__item" key={todo.id}>
            <input
              className="todoapp__input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todoapp__name" onClick={() => toggleTodo(todo.id)}>{todo.title}</span>
            <button className="todoapp__button" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <nav className="todoapp__filter">
        {Object.values(Status).map(status => (
          <a
            key={status}
            href={status === Status.All ? `#/` : `#/${status.toLowerCase()}`}
            className={`todoapp__filter-link ${filterStatus === status ? 'selected' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setFilterStatus(status);
            }}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed todoapp__button"
        disabled={!todosCompleted}
        onClick={handleClearCompleted}
      >
        Clear Completed
      </button>
      <span className="todoapp__count">{`${todosActive} item left`}</span>
    </div>
  )
}

export default App
