import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NextSevenDaysComponent } from './next-seven-days/next-seven-days.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NextSevenDaysComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class NextSevenDaysModule { }
