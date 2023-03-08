import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { FileService } from 'src/app/services/file.service';
import { selectEmployee } from 'src/app/store/employee/employee.selector';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.css'],
})
export class EmployeePersonalInfoComponent {
  constructor(
    private fileService: FileService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  username: string = 'aaron'
  personalInfoForm$: Observable<any> = this.store.select(selectEmployee);
  editable: boolean = false;
  personalInfoForm: FormGroup = this.formBuilder.group({
    firstName: [{ value: '', disabled: true }, Validators.required],
    lastName: [{ value: '', disabled: true }, Validators.required],
    middleName: [{ value: '', disabled: true }],
    preferredName: [{ value: 'yingji yan', disabled: true }],
    email: [{ value: '', disabled: true }, Validators.required],
    SSN: [{ value: '', disabled: true }, Validators.required],
    dateOfBirth: [{ value: '', disabled: true }, Validators.required],
    building: [{ value: '', disabled: true }, Validators.required],
    street: [{ value: '', disabled: true }, Validators.required],
    city: [{ value: '', disabled: true }, Validators.required],
    state: [{ value: '', disabled: true }, Validators.required],
    zip: [{ value: '', disabled: true }, Validators.required],
    cellphone: [{ value: '', disabled: true }, Validators.required],
    workphone: [{ value: '', disabled: true }, Validators.required],
    visatitle: [{ value: '', disabled: true }, Validators.required],
    start: [{ value: '', disabled: true }, Validators.required],
    end: [{ value: '', disabled: true }, Validators.required],
    efirstName: [{ value: 'yingji yan', disabled: true }, Validators.required],
    elastName: [{ value: '', disabled: true }, Validators.required],
    emiddleName: [{ value: '', disabled: true }],
    ephone: [{ value: 'yingji yan', disabled: true }],
    eemail: [{ value: '', disabled: true }, Validators.required],
    relationship: [{ value: '', disabled: true }, Validators.required],
  });
  ngOnInit() {
    this.personalInfoForm.disable();
  }

  // ngOnInit() {
  //   this.users$
  //     .pipe(catchError((err) => of([{ err }])))
  //     .subscribe((user: any) => {
  //       if (user) {
  //         this.profile = user.profile
  //         // this.status = user.status
  //       }
  //     }

  edit() {
    this.editable = true;
    this.personalInfoForm.enable();
  }
  cancel() {
    // this.personalInfoForm.reset();
    this.personalInfoForm.disable();
  }

  save(): void {
    console.log(this.personalInfoForm.getRawValue() )
    this.personalInfoForm.disable();
    fetch('http://localhost:3000/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJlbWFpbCI6ImRhejAwNEB1Y3NkLmVkdSIsImlhdCI6MTY3ODE1NTE1MywiZXhwIjoxNjc4MTY1OTUzfQ.QRtihBwAhBvidh4scWNEv6GdiJY0AcgkxXPy7UNr_0g'
      },
      body: JSON.stringify({ "username": this.username, "profileData":{}})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
