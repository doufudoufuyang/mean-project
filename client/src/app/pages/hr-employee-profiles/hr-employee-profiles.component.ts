import { Component } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-hr-employee-profiles',
  templateUrl: './hr-employee-profiles.component.html',
  styleUrls: ['./hr-employee-profiles.component.css']
})
export class HrEmployeeProfilesComponent {
  constructor(){}
  profiles:Employee[] = [];
  ngOnInit()
  {
    fetch("http://localhost:3000/hr/profiles").
    then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.profiles = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}
