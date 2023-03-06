import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerToken : string | undefined
  registerForm : FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder,
    private http : HttpClient
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('1111: ', params['token'])
      this.registerToken = params['token']
      console.log('register token: ', this.registerToken)
    })
  }

  register(){
    console.log(this.registerForm.getRawValue())

    const requestBody = this.registerForm.getRawValue()
    let token = '' 
    if (this.registerToken){
      token = `jwt ${this.registerToken}`
    }
    this.http.post('http://localhost:3000/user/register', requestBody, {
      headers : {'authorization' : token}
    }).subscribe((data) => {
      console.log(data)
      this.router.navigate(['login'])
    }, (error) => {
      console.log('error', error)
    })
  }
}
