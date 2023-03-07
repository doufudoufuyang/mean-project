import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.css'],
})
export class EmployeePersonalInfoComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  disabled: boolean = true;
  personalInfoForm: FormGroup = this.formBuilder.group({
    firstName: [{ value:'yingji yan', disabled: true }, Validators.required],
    lastName: [{ value:'', disabled: true }, Validators.required],
    middleName: [{ value:'', disabled: true }, Validators.required],
    preferredName: [{ value:'yingji yan', disabled: true }, Validators.required],
    email: ['', Validators.required],
    SSN: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    // middleName: ['', Validators.required],
    // preferredName: ['', Validators.required],
    // email: ['', Validators.required],
    // SSN: ['', Validators.required],
  });
  init(){
    this.personalInfoForm.disable();
  }
  edit() {
    this.personalInfoForm.enable();
  }
}
