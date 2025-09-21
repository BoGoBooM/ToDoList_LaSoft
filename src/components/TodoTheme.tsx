import React, { useContext, memo } from 'react';
import { ThemeContext } from '../ThemeContext';

export const TodoTheme: React.FC = memo(() => {
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className="todoapp__button"
      onClick={toggleTheme}
      style={{ background: theme.button, color: theme.buttonText }}
    >
      Toggle Theme
    </button>
  );
});
