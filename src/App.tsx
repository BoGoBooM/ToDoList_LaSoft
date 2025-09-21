import React, { useReducer, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { todoReducer } from './reducers/todoReducer';
import { Status } from './types/Todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoTheme } from './components/TodoTheme';
import { ThemeContext } from './ThemeContext';
import './App.css';

export const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  const { theme } = useContext(ThemeContext);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      dispatch({ type: 'add', title: newTodo.trim() });
      setNewTodo('');
    }
  }, [newTodo]);

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const toggleAll = useCallback(() => {
    dispatch({ type: 'toggleAll' });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: 'delete', id });
  }, []);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'clearCompleted' });
  }, []);

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


  const todosCompleted = todos.filter(todo => todo.completed).length;
  const todosActive = todos.filter(todo => !todo.completed).length;


  useEffect(() => {
    document.body.style.background = theme.background;
  }, [theme]);


  return (
    <div className="todoapp" style={{ background: theme.cardBG }}>
      <h1 className="todoapp__title" style={{ color: theme.todosText }}>Todos</h1>
      <div className="todoapp__switcher">
        <TodoTheme />
      </div>

      <TodoInput value={newTodo} onChange={setNewTodo} onAdd={addTodo} />

      <div className="todoapp__wrapper">
        <input
          className="todoapp__checkbox"
          type="checkbox"
          onChange={toggleAll}
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          id="toggleAll"
        />
        <label
          className="todoapp__label" 
          htmlFor="toggleAll"
          style={{ color: theme.todosText }}
        >
          Toggle All
        </label>
      </div>

      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

      <TodoFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

      <button
        type="button"
        className="todoapp__clear-completed todoapp__button"
        disabled={!todosCompleted}
        onClick={handleClearCompleted}
        style={{ background: theme.button, color: theme.buttonText }}
      >
        Clear Completed
      </button>
      <span className="todoapp__count">{`${todosActive} item left`}</span>
    </div>
  )
}

export default App
