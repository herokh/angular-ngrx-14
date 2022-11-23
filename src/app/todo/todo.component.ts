import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { addTodo, loadTodos, removeTodo } from '../state/todos/todo.action';
import { TodoState } from '../state/todos/todo.reducer';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]> = this.store.select((state) => {
    return state.todo.todos;
  });
  form: FormGroup;

  constructor(
    private store: Store<{ todo: TodoState }>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  addTodo() {
    this.form.markAllAsTouched();
    if (this.content?.valid) {
      this.store.dispatch(addTodo({ content: this.content?.value }));
      this.content?.setValue('');
      this.form.reset();
    }
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  get content() {
    return this.form.get('content');
  }
}
