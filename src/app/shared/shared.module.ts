import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoComponent } from './components/todo/todo.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ActiveTodosPipe } from './pipes/active-todos.pipe';

@NgModule({
  declarations: [AddTodoComponent, TodoComponent, ActiveTodosPipe],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [MatDatepickerModule],
  exports: [AddTodoComponent, TodoComponent, ActiveTodosPipe]
})
export class SharedModule {}
