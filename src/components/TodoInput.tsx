import React, { memo, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export const TodoInput: React.FC<Props> = memo(({ value, onChange, onAdd }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <input
        className="todoapp__input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Add new task..."
        style={{ background: theme.cardBG, color: theme.todosText }}
      />

      <button
        className="todoapp__button"
        onClick={onAdd}
        style={{ background: theme.button }}
      >
        Add Todo
      </button>
    </>
  )
});
