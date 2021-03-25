import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public reports: Array<any> = [];
  public loading: boolean = false;
  public total: number;
  public avg: number;
  public manual: number;
  public auto: number;

  constructor(
    public reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.getTodayReport();
  }

  getTodayReport(): void {
    this.loading = true;
    this.reportService.getTodayReport().subscribe(result => {
      this.reports = result.result;
      this.total = result.result.total || 0;
      this.avg = result.result.avg?.toFixed(0) || 0;
      this.manual = result.result.manual || 0;
      this.auto = result.result.auto || 0;
      this.loading = false;
      console.log(result);
    })
  }

}
