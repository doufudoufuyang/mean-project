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
  init() {
    this.personalInfoForm.disable();
  }
  
  ngOnInit() {
    

    }

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
    // const token = window.localStorage.getItem("JWT_TOKEN")
    this.http.post('http://localhost:3000/user/profile',{"profileData":this.personalInfoForm.getRawValue()})
    .subscribe((res: any) => {
        console.log(res.message)
    });
    // fetch('http://localhost:3000/user/profile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': token
    //   },
    //   body: JSON.stringify({ "username": this.username, "profileData":this.personalInfoForm.getRawValue()})
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  }
}
