import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { emptyValidator } from 'src/app/validator/empty.validator';

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
    private formBuilder: FormBuilder
  ) {}

  report: any;
  form: FormGroup = this.formBuilder.group({
    description: ['', emptyValidator()],
  });

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.http.get('http://localhost:3000/user/report/' + id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.report = res.report;
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }

  onClick(): void {
    const requestBody = {
      id: this.report._id,
      description: this.form.getRawValue().description,
    }
    console.log(requestBody);
    this.reportService.UpdateReport(requestBody);
  }
}
