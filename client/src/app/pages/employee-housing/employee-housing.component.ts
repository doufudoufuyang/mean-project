import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportService } from 'src/app/services/report/report.service';
import { selectReports } from 'src/app/store/report/report.selector';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { Report } from 'src/app/interfaces/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-housing',
  templateUrl: './employee-housing.component.html',
  styleUrls: ['./employee-housing.component.css']
})
export class EmployeeHousingComponent implements OnInit {
  house: any;
  reports$: Observable<Report[]> = this.store.select(selectReports);

  constructor (
    public dialog: MatDialog,
    private http: HttpClient,
    private reportService: ReportService,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
    this.http.get('http://localhost:3000/user/house').subscribe({
      next: (res: any) => {
        console.log(res);
        this.house = res.house;
      },
      error: (e) => {
        alert(e.error.message);
      }
    });

    this.reportService.getReports();
  }

  openDialog(): void {
    this.dialog.open(ReportDialogComponent);
  }

  onCardClick(id: string): void {
    this.router.navigate(['employeeHousing/report/' + id]);
  }
}
