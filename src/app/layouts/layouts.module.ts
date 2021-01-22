import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { ClarityModule } from '@clr/angular';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';


@NgModule({
  declarations: [LoginLayoutComponent, MainLayoutComponent, HeaderComponent, BlankLayoutComponent, PageNotfoundComponent],
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
