import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OnboardComponent } from './components/onboard/onboard.component';
import { EmployeePersonalInfoComponent } from './components/employee-personal-info/employee-personal-info.component';
import { EmployeeVisaStatusComponent } from './components/employee-visa-status/employee-visa-status.component';
import { EmployeeHousingComponent } from './components/employee-housing/employee-housing.component';
import { HrHomeComponent } from './components/hr-home/hr-home.component';
import { HrEmployeeProfilesComponent } from './components/hr-employee-profiles/hr-employee-profiles.component';
import { HrHiringManagementComponent } from './components/hr-hiring-management/hr-hiring-management.component';
import { HrVisaManagementComponent } from './components/hr-visa-management/hr-visa-management.component';
import { HrHousingManagementComponent } from './components/hr-housing-management/hr-housing-management.component';

const routes: Routes = [
  {path : '', component: LoginComponent},
  {path : 'login', component: LoginComponent},
  {path : 'onboard', component: OnboardComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'employeeInfo', component: EmployeePersonalInfoComponent},
  {path : 'employeeVisa', component: EmployeeVisaStatusComponent},
  {path : 'employeeHousing', component: EmployeeHousingComponent},
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
