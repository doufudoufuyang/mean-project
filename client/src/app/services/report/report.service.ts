import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Report } from 'src/app/interfaces/report';
import { ReportAction } from 'src/app/store/report/report.action';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient, private store: Store) {}

  private url = 'http://localhost:3000/user/';

  getReports(): void {
    this.http.get(this.url + 'reports')
      .subscribe({
        next: (res: any) => {
          const reports: any[] = res.reports;
          // console.log(reports);
          this.store.dispatch(ReportAction.getReports({ reports }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }

  getReport(id: string): void {
    this.http.get<Report>(this.url + 'report/' + id);
  }

  addReport(report: Report): void {
    this.http.post(this.url + 'report', report)
      .subscribe({
        next: (report: any) => {
          console.log(report);
          this.store.dispatch(ReportAction.addReport({ report }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }

  UpdateReport(requestBody: any): void {
    this.http.put(this.url + 'report', requestBody)
      .subscribe({
        next: (res: any) => {
          const report = res.report;
          console.log(report);
          this.store.dispatch(ReportAction.updateReport({ report }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }
}
