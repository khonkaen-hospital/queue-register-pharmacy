import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { QueueService } from './queue.service';
import { HttpParams } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';
import * as moment from 'moment';
import { ClrLoadingState } from '@clr/angular';

interface Patient {
  hn: string;
  vn: string;
  fullname: string;
  clinic: string;
  date?: string;
  time?: string;
  data?: Array<any>
}
@Component({
  selector: 'app-queue-calling',
  templateUrl: './queue-calling.component.html',
  styleUrls: ['./queue-calling.component.scss']
})
export class QueueCallingComponent implements OnInit, AfterViewInit {

  @ViewChild('registerForm') registerForm: ElementRef;
  @ViewChild('btnConfirmPrint') btnConfirmPrint: ElementRef;

  queues: Array<any> = [];
  autoQueuPharmacy: Array<any> = [];
  servicePoints: Array<any> = [];
  priorities: Array<any> = [];
  hisVisits: Array<any> = [];
  selected: Array<any> = [];
  loading = false;
  autoQueuPharmacyLoading = false;
  servicePointId: string | null;
  servicePointName: string | null;
  prioritieId: string | null;
  search: string;
  robotUserId: string;
  printConfirmModal: boolean = false;
  loadingRegisterQueue: ClrLoadingState = ClrLoadingState.DEFAULT;
  selectedPatient: Patient;
  timer: any;

  constructor(
    private queueService: QueueService,
    private cdr: ChangeDetectorRef,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {

    this.setInitCurrentData();
    this.getPriorities();
    this.getServicePoints();
    this.getQueueActive(this.servicePointId || '');
    this.getHisVisits();
    this.getAutoQueuFormPharmacy('');
    this.setFocus();
    this.selectedPatient = { vn: '', hn: '', fullname: '', clinic: '' };
    let robotUserId = localStorage.getItem('userRobotId');
    if (robotUserId) {
      this.robotUserId = robotUserId;
    }
  }

  reloadData() {
    this.getQueueActive(this.servicePointId || '');
    this.getHisVisits();
    this.getAutoQueuFormPharmacy('');
  }

  setFocus() {
    setTimeout(() => {
      let ele = this.registerForm.nativeElement['search'];
      ele.focus();
    }, 100);
  }

  setInitCurrentData() {
    this.servicePointName = (localStorage.getItem('currentServicePointName'));
    this.servicePointId = (localStorage.getItem('currentServicePointID'));
    this.prioritieId = (localStorage.getItem('prioritieId'));
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  delaySerch(event: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.onSearch(event);
    }, 400);
  }

  onSearch(event: any) {
    console.log(event);
    const httpParams = new HttpParams().set('query', this.search || '');
    this.queueService.getHisVisits(httpParams).subscribe(results => {
      this.hisVisits = results.results;

      if (this.hisVisits.length === 1) {
        this.printConfirmModal = true;
        this.selectedPatient = {
          hn: this.hisVisits[0].hn,
          vn: this.hisVisits[0].vn,
          fullname: this.hisVisits[0].title + this.hisVisits[0].first_name + ' ' + this.hisVisits[0].last_name,
          clinic: this.hisVisits[0].clinic_name,
          time: this.hisVisits[0].time_serv,
          data: this.hisVisits[0]
        }
        setTimeout(() => {
          this.btnConfirmPrint.nativeElement.focus();
        }, 550);

      }
    });
  }

  onConfirmPrint() {
    this.onRegister(this.selectedPatient.data);
  }

  getQueueActive(servicePointId: string, query = '') {

    const httpParams = new HttpParams()
      .set('servicePointId', servicePointId)
      .set('query', query);
    console.log('servicePointId', httpParams.toString(), servicePointId);
    this.loading = true;
    this.queueService.getVisitHistoryQueue(httpParams).subscribe(results => {
      this.queues = results.results;
      this.loading = false;
    });
  }

  getPriorities() {
    this.queueService.getPriorities().subscribe(results => {
      this.priorities = results.results;
    });
  }

  getHisVisits() {
    const httpParams = new HttpParams().set('query', this.search || '');
    this.queueService.getHisVisits(httpParams).subscribe(results => {
      this.hisVisits = results.results;
    });
  }

  getAutoQueuFormPharmacy(hn: string) {
    this.autoQueuPharmacyLoading = true;
    const httpParams = new HttpParams().set('hn', hn);
    this.queueService.getAutoQueuFormPharmacy(httpParams).subscribe(results => {
      this.autoQueuPharmacy = results.results;
      this.autoQueuPharmacyLoading = false;
    });
  }

  getServicePoints() {
    this.servicePoints = JSON.parse(localStorage.getItem('servicePoints') || '[]');
  }

  onChangeServicePoint(event: any): void {
    console.log(event);
    let selectElementText = event.target['options'][event.target['options'].selectedIndex].text;
    localStorage.setItem('currentServicePointID', event.target.value);
    localStorage.setItem('currentServicePointName', selectElementText);
    this.servicePointName = selectElementText;
    this.getQueueActive(event.target.value);
  }

  onChangePriorities(event: any): void {
    localStorage.setItem('prioritieId', event.target.value);
  }

  onRegister(patientVisit: any) {
    this.loadingRegisterQueue = ClrLoadingState.LOADING;
    if (this.servicePointId && this.prioritieId) {
      let data = {
        hn: patientVisit.hn,
        vn: patientVisit.vn,
        clinicCode: patientVisit.clinic_code,
        priorityId: this.prioritieId,
        servicePointId: this.servicePointId,
        dateServ: patientVisit.date_serv,
        timeServ: patientVisit.time_serv,
        hisQueue: patientVisit.his_queue,
        title: patientVisit.title,
        firstName: patientVisit.first_name,
        lastName: patientVisit.last_name,
        birthDate: patientVisit.birthdate,
        sex: patientVisit.sex
      }
      this.queueService.registerQueue(data).subscribe(result => {

        console.log('Queue=', result);
        this.search = '';
        this.getQueueActive(this.servicePointId || '');
        this.reloadData();
        if (result.isDuplicate === 0) {
          this.setRobotQueueCheckin({
            hn: result.hn,
            vn: result.vn,
            user_id: this.robotUserId,
            que: result.queueNumber,
            date: moment().locale('th').format('YYYY-MM-DD'),
            time: moment().locale('th').format('HH:mm')
          });
        }

        setTimeout(() => {
          this.loadingRegisterQueue = ClrLoadingState.SUCCESS;
        }, 1000);
        this.printConfirmModal = false;
        this.setFocus();

        this.printSlip(result.queueId, patientVisit.clinic_name, result.vn);
      })
    } else this.loadingRegisterQueue = ClrLoadingState.SUCCESS;
  }

  printSlip(queue_id: string, clinic_name: string, vn: string) {
    this.queueService.getPrintData(queue_id).subscribe(result => {
      this.electronService.ipcRenderer.sendSync('printQueue', {
        ...result.data, ...{
          printerIp: localStorage.getItem('printerIp') || '',
          servicePointId: this.servicePointId,
          clinicName: clinic_name,
          vn: vn
        }
      });
    })
  }

  setRobotQueueCheckin(data: any) {
    try {
      this.queueService.setRobotQueueCheckin(data).subscribe(result => {
        console.log(result);
      });
    } catch (error) {

    }
  }

  onSetUserId($event: any) {
    localStorage.setItem('userRobotId', this.robotUserId);
  }


}
