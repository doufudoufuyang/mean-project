import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { emptyValidator } from 'src/app/validator/empty.validator';
import { CommentDialogData } from 'src/app/pages/employee-report/employee-report.component';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  form: FormGroup = this.formBuilder.group({
    reportId: [this.data.reportId, emptyValidator()],
    commentId: [this.data.commentId, emptyValidator()],
    description: [this.data.description, emptyValidator()],
  })

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  onSubmit(): void {
    const requestBody = this.form.getRawValue();
    console.log(requestBody);
    this.reportService.updateReport(requestBody);
  }
}
