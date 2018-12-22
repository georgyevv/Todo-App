import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  private initialDuedate: Date;

  @Input() set duedate(duedate: Date) {
    this._duedate = duedate;
    this.initialDuedate = duedate;
  }

  @Output() add = new EventEmitter<TodoModel>();

  public addTodoMode: boolean;
  public title: string;
  public _duedate: Date;

  public addTodo() {
    const newTodo = new TodoModel();
    newTodo.title = this.title;
    newTodo.date = this._duedate;

    this.title = undefined;
    this._duedate = this.initialDuedate;
    this.addTodoMode = false;

    this.add.emit(newTodo);
  }
}
