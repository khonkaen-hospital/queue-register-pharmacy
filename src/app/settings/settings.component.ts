import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  printerIp: string;

  constructor(
    private router: Router
  ) {
    this.printerIp = localStorage.getItem('printerIp') || '';
  }

  ngOnInit(): void {
  }

  saveSettings(): void {
    localStorage.setItem('printerIp', this.printerIp);
    this.router.navigateByUrl('/queue-calling');
  }

}
