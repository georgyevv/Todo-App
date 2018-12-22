import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Pipe({
  name: 'activeTodos'
})
export class ActiveTodosPipe implements PipeTransform {
  transform(allTodos: TodoModel[], args?: any): any {
    if (!allTodos) {
      return null;
    }

    return allTodos.filter(t => !t.isCompleted);
  }
}
