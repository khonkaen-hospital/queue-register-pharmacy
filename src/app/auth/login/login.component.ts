import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ClrLoadingState } from '@clr/angular';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isError: boolean = false;
  public message: string;
  public submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['/queue-calling/index'])
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.form.invalid) {

    } else {
      this.submitBtnState = ClrLoadingState.LOADING;
      this.authService.login(this.form.value)
        .subscribe(result => {
          if (result?.token) {
            this.router.navigateByUrl('queue-calling/index');
          } else {
            this.isError = true;
            this.message = result.message || ' Username & Password ไม่ถูกต้อง!';
            this.resetInvalidState();
          }
          this.submitBtnState = ClrLoadingState.SUCCESS;
        })
    }
  }

  resetInvalidState() {
    setTimeout(() => {
      this.isError = false;
      this.message = '';
    }, 3000);

  }
}
