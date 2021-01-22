import { Component, OnInit } from '@angular/core';
import { QueueService } from './queue.service';

@Component({
  selector: 'app-queue-calling',
  templateUrl: './queue-calling.component.html',
  styleUrls: ['./queue-calling.component.scss']
})
export class QueueCallingComponent implements OnInit {

  queues: Array<any> = [];
  selected: Array<any> = [];
  loading = false;

  constructor(
    private queueService: QueueService
  ) { }

  ngOnInit(): void {
    this.getQueueActive();
  }

  getQueueActive() {
    this.loading = true;
    this.queueService.getQueue().subscribe(results => {
      this.queues = results.results;
      this.loading = false;
    });
  }

}
