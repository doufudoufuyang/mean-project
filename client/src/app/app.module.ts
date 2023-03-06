import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OnboardComponent } from './components/onboard/onboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmployeePersonalInfoComponent } from './components/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from './components/employee-visa-status/employee-visa-status.component';
import { HrHomeComponent } from './components/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from './components/hr-employee-profiles/hr-employee-profiles.component';
import { HrVisaManagementComponent } from './components/hr-visa-management/hr-visa-management.component';
import { HrHiringManagementComponent } from './components/hr-hiring-management/hr-hiring-management.component';
import { HrHousingManagementComponent } from './components/hr-housing-management/hr-housing-management.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


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
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
