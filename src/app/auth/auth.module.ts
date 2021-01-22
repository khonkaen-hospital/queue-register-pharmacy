import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
