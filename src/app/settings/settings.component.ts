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
  ) { }

  ngOnInit(): void {
    this.printerIp = localStorage.getItem('printerIp') || '';
  }

  saveSettings(): void {
    localStorage.setItem('printerIp', this.printerIp);
    this.router.navigateByUrl('/queue-calling');
  }

}
