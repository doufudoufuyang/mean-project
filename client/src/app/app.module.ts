import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OnboardComponent } from './pages/onboard/onboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { EmployeePersonalInfoComponent } from './pages/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from './pages/employee-visa-status/employee-visa-status.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from './pages/hr-employee-profiles/hr-employee-profiles.component';
import { HrVisaManagementComponent } from './pages/hr-visa-management/hr-visa-management.component';
import { HrHiringManagementComponent } from './pages/hr-hiring-management/hr-hiring-management.component';
import { HrHousingManagementComponent } from './pages/hr-housing-management/hr-housing-management.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OnboardComponent,
    HeaderComponent,
    FooterComponent,
    EmployeePersonalInfoComponent,
    EmployeeVisaStatusComponent,
    HrHomeComponent,
    HrEmployeeProfilesComponent,
    HrVisaManagementComponent,
    HrHiringManagementComponent,
    HrHousingManagementComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
