import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffect } from '../state/todos/todo.effect';
import { todoFeatureKey, todoReducer } from '../state/todos/todo.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(todoFeatureKey, todoReducer),
    EffectsModule.forFeature([TodoEffect]),
  ],
})
export class TodoModule {}
