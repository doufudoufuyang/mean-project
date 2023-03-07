import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Report } from 'src/app/interfaces/report';
import { ReportDialogData } from 'src/app/pages/employee-housing/employee-housing.component';
import { ReportService } from 'src/app/services/report/report.service';
import { emptyValidator } from 'src/app/validator/empty.validator';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent {
  form: FormGroup = this.formBuilder.group({
    title: ['', emptyValidator()],
    description: ['', emptyValidator()],
  })

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogData,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  onSubmit(): void {
    const report: Report = this.form.getRawValue();
    this.reportService.addReport(report);
  }
}
