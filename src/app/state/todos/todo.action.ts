import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo/todo.model';

export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ content: string }>()
);

export const addTodoSuccess = createAction(
  '[Todo Page] Add Todo Success',
  props<{ todo: Todo }>()
);

export const addTodoFailure = createAction(
  '[Todo Page] Add Todo Failure',
  props<{ error: string }>()
);

export const removeTodo = createAction(
  '[Todo Page] Remove Todo',
  props<{ id: string }>()
);
export const removeTodoSuccess = createAction(
  '[Todo Page] Remove Todo Success',
  props<{ id: string }>()
);

export const removeTodoFailure = createAction(
  '[Todo Page] Remove Todo Failure',
  props<{ error: string }>()
);

export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo Page] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo Page] Load Todos Failure',
  props<{ error: string }>()
);
