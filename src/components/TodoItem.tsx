import React, { memo, useContext } from 'react';
import type { Todo } from '../types/Todo';
import { ThemeContext } from '../ThemeContext';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<Props> = memo(({ todo, onToggle, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className="todoapp__item"
      key={todo.id}
    >
      <input
        className="todoapp__checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className="todoapp__name"
        onClick={() => onToggle(todo.id)}
        style={{ background: theme.cardBG, color: theme.todosText }}
      >
          {todo.title}
      </span>
      <button
        className="todoapp__button"
        onClick={() => onDelete(todo.id)}
        style={{ background: theme.button, color: theme.buttonText }}
      >Delete</button>
    </li>
  );
});
