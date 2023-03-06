import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OnboardComponent } from './pages/onboard/onboard.component';
import { EmployeePersonalInfoComponent } from './pages/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from './pages/employee-visa-status/employee-visa-status.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from './pages/hr-employee-profiles/hr-employee-profiles.component';
import { HrVisaManagementComponent } from './pages/hr-visa-management/hr-visa-management.component';
import { HrHiringManagementComponent } from './pages/hr-hiring-management/hr-hiring-management.component';
import { HrHousingManagementComponent } from './pages/hr-housing-management/hr-housing-management.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { userReducer } from './store/user.reducer';
import { houseReducer } from './store/house/house.reducer';
import { reportReducer } from './store/report/report.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OnboardComponent,
    EmployeePersonalInfoComponent,
    EmployeeVisaStatusComponent,
    HrHomeComponent,
    HrEmployeeProfilesComponent,
    HrVisaManagementComponent,
    HrHiringManagementComponent,
    HrHousingManagementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
