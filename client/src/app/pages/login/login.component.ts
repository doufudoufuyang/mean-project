import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { EmployeeAction } from 'src/app/store/employee/employee.action';

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
          const employeeInfo = data.user
          if (data.user.role === 'employee') {
            this.store.dispatch(EmployeeAction.setEmployeeInfo({ employeeInfo }))
            if (data.user.status !== 'Approved') {
              this.router.navigate(['onboard'])
              return
            } else {
              this.router.navigate(['employeeInfo'])
              return
            }
          } else {
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
