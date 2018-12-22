import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox/inbox.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox', component: InboxComponent },
  { path: 'today', component: InboxComponent },
  { path: 'seven-days', component: InboxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
