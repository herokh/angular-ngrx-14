import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/todo/todo.model';
import * as TodoActions from './todo.action';

export interface TodoState {
  todos: Todo[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
  todos: [],
  error: '',
  status: 'pending',
};

export const todoFeatureKey = 'todo';

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { content }) => ({
    ...state,
    status: 'loading',
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    status: 'success',
    todos: [...state.todos, todo],
  })),
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(TodoActions.removeTodo, (state, { id }) => ({
    ...state,
    status: 'loading',
  })),
  on(TodoActions.removeTodoSuccess, (state, { id }) => ({
    ...state,
    status: 'success',
    todos: state.todos.filter((t) => t.id !== id),
  })),
  on(TodoActions.removeTodoFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: '',
    status: 'success',
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
