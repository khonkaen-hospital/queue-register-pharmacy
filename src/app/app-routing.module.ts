import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotfoundComponent } from './layouts/page-notfound/page-notfound.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { SettingsComponent } from './settings/settings.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'queue-calling', canActivate: [AuthGuard], loadChildren: () => import('./queue-calling/queue-calling.module').then(m => m.QueueCallingModule) },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    ]
  },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  {
    path: '**', component: BlankLayoutComponent, children: [
      { path: '', component: PageNotfoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
