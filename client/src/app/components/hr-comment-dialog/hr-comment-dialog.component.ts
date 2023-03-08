import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from 'src/app/interfaces/report';
import { HrCommentDialogData } from 'src/app/pages/hr-report/hr-report.component';

@Component({
  selector: 'app-hr-comment-dialog',
  templateUrl: './hr-comment-dialog.component.html',
  styleUrls: ['./hr-comment-dialog.component.css']
})
export class HrCommentDialogComponent {
  form: FormGroup = this.formBuilder.group({
    reportId: [this.data.reportId, Validators.required],
    commentId: [this.data.commentId, Validators.required],
    description: [this.data.description, Validators.required],
  })
  result!: Report;

  constructor(
    public dialogRef: MatDialogRef<HrCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HrCommentDialogData,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    const requestBody = this.form.getRawValue();
    this.http.put('http://localhost:3000/user/report', requestBody)
      .subscribe({
        next: (res: any) => {
          this.result = res.report;
          this.dialogRef.close(this.result);
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
