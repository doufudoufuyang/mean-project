import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportService } from 'src/app/services/report/report.service';
import { selectReports } from 'src/app/store/report/report.selector';

@Component({
  selector: 'app-employee-housing',
  templateUrl: './employee-housing.component.html',
  styleUrls: ['./employee-housing.component.css']
})
export class EmployeeHousingComponent implements OnInit {
  constructor (
    private http: HttpClient,
    private reportService: ReportService,
    private store: Store,
  ) {}

  house: any;
  reports$: Observable<any> = this.store.select(selectReports);

  ngOnInit () {
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
}
