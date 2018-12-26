import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  public activeTodos: TodoModel[];
  public completedTodos: TodoModel[];
  public lastCompletedTodo: TodoModel;
  public lastDeletedTodo: TodoModel;

  public todos: TodoModel[];

  constructor(public snackBar: MatSnackBar, public todoService: TodoService) {
    this.activeTodos = [];
    this.completedTodos = [];
  }

  public ngOnInit() {
    this.todoService.getTodosList().subscribe(todos => {
      this.todos = todos;
    });
  }

  public openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000
    });

    snackBarRef.onAction().subscribe(() => {
      if (this.lastCompletedTodo) {
        this.lastCompletedTodo.isCompleted = false;
        this.editTodo(this.lastCompletedTodo);
        this.lastCompletedTodo = undefined;
      }

      if (this.lastDeletedTodo) {
        this.lastDeletedTodo.isDeleted = false;
        this.todoService.update(this.lastDeletedTodo);
        this.lastDeletedTodo = undefined;
      }
    });
  }

  public addTodo(todo: TodoModel) {
    todo.date = todo.date.setHours(0, 0, 0, 0);
    todo.order = this.todos.length + 1;
    this.todoService.create(todo);
  }

  public editTodo(todo: TodoModel) {
    this.todoService.update(todo);
  }

  public changeTodoPriority(todo: TodoModel) {
    this.todoService.update(todo);
  }

  public completeTodo(todo: TodoModel) {
    todo.isCompleted = true;
    this.todoService.update(todo);
    this.lastCompletedTodo = todo;
    this.openSnackBar('Todo completed', 'UNDO');
  }

  public deleteTodo(todo: any) {
    this.lastDeletedTodo = todo;
    this.todoService.delete(todo);
    this.openSnackBar('Todo deleted', 'UNDO');
  }

  public moveTodoUp(todo: TodoModel) {
    if (todo.order <= 1) {
      return;
    }

    todo.order--;
    this.todoService.update(todo);

    const index = this.todos.findIndex(t => todo === t);
    const todoBefore = this.todos[index - 1];
    todoBefore.order++;
    this.todoService.update(todoBefore);
  }

  public moveTodoDown(todo: TodoModel) {
    if (todo.order >= this.todos.length) {
      return;
    }

    todo.order++;
    this.todoService.update(todo);

    const index = this.todos.findIndex(t => todo === t);
    const todoBefore = this.todos[index + 1];
    todoBefore.order--;
    this.todoService.update(todoBefore);
  }
}
