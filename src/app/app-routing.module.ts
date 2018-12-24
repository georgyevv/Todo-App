import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox/inbox.component';
import { TodayComponent } from './today/today/today.component';
import { NextSevenDaysComponent } from './next-seven-days/next-seven-days/next-seven-days.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox', component: InboxComponent },
  { path: 'today', component: TodayComponent },
  { path: 'next-seven-days', component: NextSevenDaysComponent },
  { path: 'search', component: SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
