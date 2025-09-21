import React, { memo, useContext } from 'react';
import { Status } from '../types/Todo';
import { ThemeContext } from '../ThemeContext';

interface Props {
  filterStatus: Status;
  setFilterStatus: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = memo(({ filterStatus, setFilterStatus }) => {
  const { theme } = useContext(ThemeContext);

  return (
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
          style={{
            background: filterStatus === status ? theme.button : 'transparent',
            color: filterStatus === status ? theme.todosText : theme.todosText,
          }}
        >
          {status}
        </a>
      ))}
    </nav>
  )
});
