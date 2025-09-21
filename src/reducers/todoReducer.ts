import { type Todo } from '../types/Todo';

type Action =
  | { type: "add", title: string }
  | { type: "toggle", id: number }
  | { type: "toggleAll" }
  | { type: "delete", id: number }
  | { type: "clearCompleted" };

export function todoReducer(state: Todo[], action: Action): Todo[] {
  const allCompleted = state.every(todo => todo.completed);

  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), title: action.title, completed: false },
      ];
    case "toggle":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "toggleAll":
      return state.map(todo => ({ ...todo, completed: !allCompleted }));
    case "delete":
      return state.filter(todo => todo.id !== action.id);
    case "clearCompleted":
      return state.filter(todo => !todo.completed)
    default:
      return state;
  }
}
