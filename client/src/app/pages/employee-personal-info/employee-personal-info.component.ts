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
  editable: boolean = false;
  personalInfoForm: FormGroup = this.formBuilder.group({
    firstName: [{ value:'yingji yan', disabled: true }, Validators.required],
    lastName: [{ value:'', disabled: true }, Validators.required],
    middleName: [{ value:'', disabled: true }],
    preferredName: [{ value:'yingji yan', disabled: true }],
    email: [{ value:'', disabled: true }, Validators.required],
    SSN: [{ value:'', disabled: true }, Validators.required],
    dateOfBirth: [{ value:'', disabled: true }, Validators.required],
    building: [{ value:'', disabled: true }, Validators.required],
    street: [{ value:'', disabled: true }, Validators.required],
    city: [{ value:'', disabled: true }, Validators.required],
    state: [{ value:'', disabled: true }, Validators.required],
    zip: [{ value:'', disabled: true }, Validators.required],
    cellphone: [{ value:'', disabled: true }, Validators.required],
    workphone: [{ value:'', disabled: true }, Validators.required],
    visatitle: [{ value:'', disabled: true }, Validators.required],
    start: [{ value:'', disabled: true }, Validators.required],
    end: [{ value:'', disabled: true }, Validators.required],
    efirstName: [{ value:'yingji yan', disabled: true }, Validators.required],
    elastName: [{ value:'', disabled: true }, Validators.required],
    emiddleName: [{ value:'', disabled: true }],
    ephone: [{ value:'yingji yan', disabled: true }],
    eemail: [{ value:'', disabled: true }, Validators.required],
    relationship: [{ value:'', disabled: true }, Validators.required],
    
    // middleName: ['', Validators.required],
    // preferredName: ['', Validators.required],
    // email: ['', Validators.required],
    // SSN: ['', Validators.required],
  });
  init(){
    this.personalInfoForm.disable();
  }
  edit() {
    this.editable = true;
    this.personalInfoForm.enable();
  }
  cancel(){
    this.personalInfoForm.reset();
    this.personalInfoForm.disable();
  }
  save(){
    this.personalInfoForm.disable();
  }
}
