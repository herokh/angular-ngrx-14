import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  from,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Todo } from 'src/app/todo/todo.model';
import { TodoService } from 'src/app/todo/todo.service';
import * as TodoAction from './todo.action';
import { TodoState } from './todo.reducer';

@Injectable()
export class TodoEffect {
  loadTodos$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoAction.loadTodos),
      switchMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => TodoAction.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoAction.loadTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoAction.addTodo),
      exhaustMap((action) =>
        this.todoService
          .addTodo({
            id: Date.now().toString(),
            content: action.content,
          })
          .pipe(
            map((todo) => TodoAction.addTodoSuccess({ todo })),
            catchError((error) => of(TodoAction.addTodoFailure({ error })))
          )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoAction.removeTodo),
      exhaustMap((action) =>
        this.todoService.removeTodo(action.id).pipe(
          map((id) => TodoAction.removeTodoSuccess({ id })),
          catchError((error) => of(TodoAction.removeTodoFailure({ error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private todoService: TodoService,
    private store: Store<{ todoState: TodoState }>
  ) {}
}
