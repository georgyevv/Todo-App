import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TodayComponent } from './today/today.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TodayComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class TodayModule { }
