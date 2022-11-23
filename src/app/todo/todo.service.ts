import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[];

  constructor(private http: HttpClient) {
    this.todos = [];
  }

  getAll() {
    return of(this.todos);
  }

  addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
    return of(todo);
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
    return of(id);
  }
}
