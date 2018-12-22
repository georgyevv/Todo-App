import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;

  public editTitle: string;
  public editDueDate: Date;

  @Input() model: TodoModel;
  @Output() priority = new EventEmitter<TodoModel>();
  @Output() edit = new EventEmitter<TodoModel>();
  @Output() complete = new EventEmitter<TodoModel>();
  @Output() delete = new EventEmitter<TodoModel>();
  @Output() moveUp = new EventEmitter<TodoModel>();
  @Output() moveDown = new EventEmitter<TodoModel>();

  public contextMenu(event) {
    this.matMenuTrigger.openMenu();
    event.preventDefault();
    event.stopPropagation();
  }

  public saveEditMode() {
    this.model.isEditMode = false;
    this.model.title = this.editTitle;
    this.model.date = this.editDueDate.getTime();

    this.editTitle = undefined;
    this.editDueDate = undefined;

    this.edit.emit(this.model);
  }

  public updateTodoPriority(priority: string) {
    this.model.priority = priority;
    this.priority.emit(this.model);
  }

  public completeTodo() {
    this.model.isCompleted = true;
    this.complete.emit(this.model);
  }

  public deleteTodo() {
    this.delete.emit(this.model);
  }

  public moveTodoUp() {
    this.moveUp.emit(this.model);
  }

  public moveTodoDown() {
    this.moveDown.emit(this.model);
  }

  public toggleEditMode() {
    this.model.isEditMode = !this.model.isEditMode;
    if (!this.model.isEditMode) {
      this.editTitle = undefined;
      this.editDueDate = undefined;
    } else {
      this.editTitle = this.model.title;
      this.editDueDate = new Date(this.model.date);
    }
  }
}
