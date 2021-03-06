import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { InboxComponent } from './inbox/inbox.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class InboxModule {}
