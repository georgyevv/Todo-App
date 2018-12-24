import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchBoxComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class SearchModule { }
