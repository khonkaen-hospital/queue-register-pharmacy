import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueCallingComponent } from './queue-calling.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', redirectTo: 'index' },
    { path: 'index', component: QueueCallingComponent, pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueCallingRoutingModule { }
