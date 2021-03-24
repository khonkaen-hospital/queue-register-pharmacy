import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
