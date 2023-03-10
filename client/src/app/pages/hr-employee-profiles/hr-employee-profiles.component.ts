import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-hr-employee-profiles',
  templateUrl: './hr-employee-profiles.component.html',
  styleUrls: ['./hr-employee-profiles.component.css'],
})
export class HrEmployeeProfilesComponent {
  constructor(
    private fileService: FileService,
    // private store: Store,
    // private route: ActivatedRoute,
    // private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  searchForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });
  profiles: any[] = []

  ngOnInit() {
    fetch(`http://localhost:3000/hr/profiles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJlbWFpbCI6ImRhejAwNEB1Y3NkLmVkdSIsImlhdCI6MTY3ODE1NTE1MywiZXhwIjoxNjc4MTY1OTUzfQ.QRtihBwAhBvidh4scWNEv6GdiJY0AcgkxXPy7UNr_0g',
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        this.profiles = res.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  search(type: string) {
    const name = this.searchForm.getRawValue().name;
    fetch(`http://localhost:3000/hr/searchProfiles?type=${type}&name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJlbWFpbCI6ImRhejAwNEB1Y3NkLmVkdSIsImlhdCI6MTY3ODE1NTE1MywiZXhwIjoxNjc4MTY1OTUzfQ.QRtihBwAhBvidh4scWNEv6GdiJY0AcgkxXPy7UNr_0g',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.profiles = data.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
