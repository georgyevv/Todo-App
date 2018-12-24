import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/shared/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-next-seven-days',
  templateUrl: './next-seven-days.component.html',
  styleUrls: ['./next-seven-days.component.scss']
})
export class NextSevenDaysComponent implements OnInit {
  public weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  public todayTodos: TodoModel[] = [];
  public tomorrowTodos: TodoModel[] = [];
  public thirdDayTodos: TodoModel[] = [];
  public fourthDayTodos: TodoModel[] = [];
  public fiftDayTodos: TodoModel[] = [];
  public sixthDayTodos: TodoModel[] = [];
  public seventhDayTodos: TodoModel[] = [];

  public today: Date;
  public tomorrow: Date;
  public thirdDay: Date;
  public fourthDay: Date;
  public fifthDay: Date;
  public sixthDay: Date;
  public seventhDay: Date;

  public activeTodos: TodoModel[];
  public completedTodos: TodoModel[];
  public lastCompletedTodo: TodoModel;
  public lastDeletedTodo: TodoModel;

  constructor(public snackBar: MatSnackBar, public todoService: TodoService) {
    this.activeTodos = [];
    this.completedTodos = [];

    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.thirdDay = new Date();
    this.thirdDay.setDate(this.thirdDay.getDate() + 2);
    this.fourthDay = new Date();
    this.fourthDay.setDate(this.fourthDay.getDate() + 3);
    this.fifthDay = new Date();
    this.fifthDay.setDate(this.fifthDay.getDate() + 4);
    this.sixthDay = new Date();
    this.sixthDay.setDate(this.sixthDay.getDate() + 5);
    this.seventhDay = new Date();
    this.seventhDay.setDate(this.seventhDay.getDate() + 6);
  }

  public ngOnInit(): void {
    this.todoService.getTodosList().subscribe(todos => {
      this.todayTodos = this.getSpecificDayTodos(todos, 0);
      this.tomorrowTodos = this.getSpecificDayTodos(todos, 1);
      this.thirdDayTodos = this.getSpecificDayTodos(todos, 2);
      this.fourthDayTodos = this.getSpecificDayTodos(todos, 3);
      this.fiftDayTodos = this.getSpecificDayTodos(todos, 4);
      this.sixthDayTodos = this.getSpecificDayTodos(todos, 5);
      this.seventhDayTodos = this.getSpecificDayTodos(todos, 6);
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

  public addTodo(todo: TodoModel, todos: TodoModel[]) {
    todo.date = todo.date.setHours(0, 0, 0, 0);
    todo.order = todos.length + 1;
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

  public moveTodoUp(todo: TodoModel, todos: TodoModel[]) {
    if (todo.order <= 1) {
      return;
    }

    todo.order--;
    this.todoService.update(todo);

    const index = todos.findIndex(t => todo === t);
    const todoBefore = todos[index - 1];
    todoBefore.order++;
    this.todoService.update(todoBefore);
  }

  public moveTodoDown(todo: TodoModel, todos: TodoModel[]) {
    if (todo.order >= todos.length) {
      return;
    }

    todo.order++;
    this.todoService.update(todo);

    const index = todos.findIndex(t => todo === t);
    const todoBefore = todos[index + 1];
    todoBefore.order--;
    this.todoService.update(todoBefore);
  }

  private getSpecificDayTodos(todos: TodoModel[], dayCounter: number): TodoModel[] {
    return todos.filter((todo) => {
      const day = new Date();
      day.setDate(day.getDate() + dayCounter);

      return todo.date === day.setHours(0, 0, 0, 0);
    });
  }
}
