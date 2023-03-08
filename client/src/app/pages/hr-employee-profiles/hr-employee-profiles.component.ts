import { Component } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-hr-employee-profiles',
  templateUrl: './hr-employee-profiles.component.html',
  styleUrls: ['./hr-employee-profiles.component.css']
})
export class HrEmployeeProfilesComponent {
  profiles:Employee[] = [{
    step:0,
    firstName: 'Aaron',
    lastName: 'Wang',
    // address: {city:'NY'},
    cellPhoneNumber: '123456789',
    workPhoneNumber:'1234',
    // car: 'Toyota',
    // email: 'aaronub2008@gmail.com',
    SSN: '123456',
    dateOfBirth: '01/01/2022',
    reference: [],
    emergencyContacts: []
  },{
    step:0,
    firstName: 'Aaron',
    lastName: 'Wang',
    // address: {city:'NY'},
    cellPhoneNumber: '123456789',
    workPhoneNumber:'1234',
    // car: 'Toyota',
    // email: 'aaronub2008@gmail.com',
    SSN: '123456',
    dateOfBirth: '01/01/2022',
    reference: [],
    emergencyContacts: []
  }];
  ngOnit(){
    
  }
}
