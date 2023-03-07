import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
// import { StoreModule } from '@ngrx/store';
// import { userReducer } from './store/user.reducer';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


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
