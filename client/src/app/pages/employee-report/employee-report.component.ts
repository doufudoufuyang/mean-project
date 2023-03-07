import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from 'src/app/services/report/report.service';
import { emptyValidator } from 'src/app/validator/empty.validator';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectReportById } from 'src/app/store/report/report.selector';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  report$: Observable<Report> | undefined;
  form: FormGroup = this.formBuilder.group({
    description: ['', emptyValidator()],
  });

  ngOnInit(): void {
    this.reportService.getReports();
    const reportId = this.route.snapshot.paramMap.get('id') as string;
    this.report$ = this.store.pipe(select(selectReportById(reportId))) as Observable<Report>;
    // console.log(this.report$)
  }

  onClick(id: string): void {
    const requestBody = {
      id,
      description: this.form.getRawValue().description,
    }
    console.log(requestBody);
    this.reportService.UpdateReport(requestBody);
    this.form.reset();
  }
}
