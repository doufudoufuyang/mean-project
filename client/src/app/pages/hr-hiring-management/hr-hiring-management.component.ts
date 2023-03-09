import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-hiring-management',
  templateUrl: './hr-hiring-management.component.html',
  styleUrls: ['./hr-hiring-management.component.css']
})
export class HrHiringManagementComponent {
  pendingProfiles!: any[];
  rejectedProfiles!: any[];
  approvedProfiles!: any[];
  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(
    private http: HttpClient,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/hr/pending')
      .subscribe((res: any) => {
        this.pendingProfiles = res.data;
        console.log('pending', this.pendingProfiles)
      });
    this.http.get('http://localhost:3000/hr/getApproved')
      .subscribe((res: any) => {
        this.approvedProfiles = res.data;
        console.log('appproved', this.approvedProfiles)
      });
    this.http.get('http://localhost:3000/hr/getRejected')
      .subscribe((res: any) => {
        this.rejectedProfiles = res.data;
        console.log('rejected', this.rejectedProfiles)
      });
  }

  onViewClick(id: string): void {
    // console.log(id)
    // this.router.navigate(['hrHiringManagement/applicationReview/' + id]);
    window.open('hrHiringManagement/application/' + id, '_blank');
  }
}
