import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueCallingRoutingModule } from './queue-calling-routing.module';
import { QueueCallingComponent } from './queue-calling.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [QueueCallingComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    QueueCallingRoutingModule
  ]
})
export class QueueCallingModule { }
