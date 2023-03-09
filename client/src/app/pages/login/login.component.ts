import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { EmployeeAction } from 'src/app/store/employee/employee.action';
import { HrAction } from 'src/app/store/hr/hr.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    const requestBody = this.loginForm.getRawValue()
    this.http.post('http://localhost:3000/user/login', requestBody)
      .subscribe({
        next: (data: any) => {
          console.log('data=', data)
          localStorage.setItem('JWT_TOKEN', data['jwt'])
          localStorage.setItem('username', data.user.username)
          if (data.user.role === 'employee') {
            const employeeInfo = data.user
            this.store.dispatch(EmployeeAction.setEmployeeInfo({ employeeInfo }))
            localStorage.setItem('isHr', String(false))
            if (data.user.status !== 'Approved') {
              this.router.navigate(['onboard'])
              return
            } else {
              this.router.navigate(['employeeInfo'])
              return
            }
          } else {
            const HrInfo = data.user
            localStorage.setItem('isHr', String(true))
            this.router.navigate(['hrHome'])
            return
          }
        },
        error: (error) => {
          this._snackBar.open('Error', error.error.message, {
            duration: 3000
          })
        },
        complete: () => { }
      })
  }
}
