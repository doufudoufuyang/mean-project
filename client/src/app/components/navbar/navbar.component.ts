import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectEmployee } from 'src/app/store/employee/employee.selector';
import { selectHr } from 'src/app/store/hr/hr.selector';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHr : boolean = false
  constructor(private router : Router){}

  ngOnInit(){
    this.isHr = localStorage.getItem('isHr') === 'true' ? true : false;
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
