import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportService } from 'src/app/services/report/report.service';
import { selectReports } from 'src/app/store/report/report.selector';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';

export interface ReportDialogData {
  animal: string,
  title: string,
  description: string,
}

@Component({
  selector: 'app-employee-housing',
  templateUrl: './employee-housing.component.html',
  styleUrls: ['./employee-housing.component.css']
})
export class EmployeeHousingComponent implements OnInit {
  house: any;
  reports$: Observable<any> = this.store.select(selectReports);
  animal: string = '';
  title: string = '';
  description: string = '';

  constructor (
    public dialog: MatDialog,
    private http: HttpClient,
    private reportService: ReportService,
    private store: Store,
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
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: { animal: this.animal, title: this.title, description: this.description },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
