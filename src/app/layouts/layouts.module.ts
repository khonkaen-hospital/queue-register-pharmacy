import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [LoginLayoutComponent, MainLayoutComponent, HeaderComponent],
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
