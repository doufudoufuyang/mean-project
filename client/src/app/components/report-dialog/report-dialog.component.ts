import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent {
  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {}

  onSubmit(): void {
    const report: Report = this.form.getRawValue();
    this.reportService.addReport(report);
  }
}
