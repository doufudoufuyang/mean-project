import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { CommentDialogData } from 'src/app/pages/employee-report/employee-report.component';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  form: FormGroup = this.formBuilder.group({
    reportId: [this.data.reportId, Validators.required],
    commentId: [this.data.commentId, Validators.required],
    description: [this.data.description, Validators.required],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {}

  onSubmit(): void {
    const requestBody = this.form.getRawValue();
    console.log(requestBody);
    this.reportService.updateReport(requestBody);
  }
}
