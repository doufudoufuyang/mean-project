import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { OnboardComponent } from '../pages/onboard/onboard.component';
import { EmployeePersonalInfoComponent } from '../pages/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from '../pages/employee-visa-status/employee-visa-status.component';
import { EmployeeHousingComponent } from '../pages/employee-housing/employee-housing.component';
import { HrHomeComponent } from '../pages/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from '../pages/hr-employee-profiles/hr-employee-profiles.component';
import { HrHiringManagementComponent } from '../pages/hr-hiring-management/hr-hiring-management.component';
import { HrVisaManagementComponent } from '../pages/hr-visa-management/hr-visa-management.component';
import { HrHousingManagementComponent } from '../pages/hr-housing-management/hr-housing-management.component';
import { EmployeeReportComponent } from '../pages/employee-report/employee-report.component';

const routes: Routes = [
  {path : '', component: LoginComponent},
  {path : 'login', component: LoginComponent},
  {path : 'onboard', component: OnboardComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'employeeInfo', component: EmployeePersonalInfoComponent},
  {path : 'employeeVisa', component: EmployeeVisaStatusComponent},
  {path : 'employeeHousing', component: EmployeeHousingComponent},
  {path : 'employeeHousing/report/:id', component: EmployeeReportComponent},
  {path : 'hrHome', component: HrHomeComponent},
  {path : 'hrEmployeeProfiles', component: HrEmployeeProfilesComponent},
  {path : 'hrVisaManagement', component: HrVisaManagementComponent},
  {path : 'hrHiringManagement', component: HrHiringManagementComponent},
  {path : 'hrHousingManagement', component: HrHousingManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
