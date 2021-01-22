import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ClrLoadingState } from '@clr/angular';
import { Router } from '@angular/router';
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
    private tokenStorage: TokenStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {

    } else {
      this.submitBtnState = ClrLoadingState.LOADING;
      this.authService.login(this.form.value).subscribe(result => {
        if (result.message) {
          this.isError = true;
          this.message = result.message;
          this.resetInvalidState();
        } else {
          console.group('subscribe');
          this.tokenStorage.saveToken(result.token);
          this.tokenStorage.saveUser(result);
          this.route.navigateByUrl('queue-calling/index');
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
