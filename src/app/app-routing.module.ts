import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' }, { path: 'queue-calling', loadChildren: () => import('./queue-calling/queue-calling.module').then(m => m.QueueCallingModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
