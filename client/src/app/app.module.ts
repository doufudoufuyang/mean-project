import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OnboardComponent } from './pages/onboard/onboard.component';
import { EmployeeHousingComponent } from './pages/employee-housing/employee-housing.component';
import { EmployeePersonalInfoComponent } from './pages/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from './pages/employee-visa-status/employee-visa-status.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from './pages/hr-employee-profiles/hr-employee-profiles.component';
import { HrVisaManagementComponent } from './pages/hr-visa-management/hr-visa-management.component';
import { HrHiringManagementComponent } from './pages/hr-hiring-management/hr-hiring-management.component';
import { HrHousingManagementComponent } from './pages/hr-housing-management/hr-housing-management.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { reportReducer } from './store/report/report.reducer';
import { EmployeeReportComponent } from './pages/employee-report/employee-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OnboardComponent,
    EmployeeHousingComponent,
    EmployeePersonalInfoComponent,
    EmployeeVisaStatusComponent,
    HrHomeComponent,
    HrEmployeeProfilesComponent,
    HrVisaManagementComponent,
    HrHiringManagementComponent,
    HrHousingManagementComponent,
    EmployeeReportComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot({
      reports: reportReducer,
    })
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'} },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
