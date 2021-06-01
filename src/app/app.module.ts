import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { NgxElectronModule } from 'ngx-electron';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    LayoutsModule,
    AppRoutingModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxElectronModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'ROBOT_API_URL', useValue: environment.robotApiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
