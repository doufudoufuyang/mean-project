import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from 'src/app/services/report/report.service';
import { emptyValidator } from 'src/app/validator/empty.validator';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectReportById } from 'src/app/store/report/report.selector';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from 'src/app/components/comment-dialog/comment-dialog.component';

export interface CommentDialogData {
  animal: string,
  reportId: string,
  commentId: string,
  description: string,
}

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  report$: Observable<Report> | undefined;
  form: FormGroup = this.formBuilder.group({
    description: ['', emptyValidator()],
  });
  animal: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reportService.getReports();
    const reportId = this.route.snapshot.paramMap.get('id') as string;
    this.report$ = this.store.pipe(select(selectReportById(reportId))) as Observable<Report>;
    // console.log(this.report$)
  }

  onAddComment(id: string): void {
    const requestBody = {
      reportId: id,
      description: this.form.getRawValue().description,
    }
    console.log(requestBody);
    this.reportService.updateReport(requestBody);
    this.form.reset();
  }

  openCommentDialog(reportId: string, commentId: string, description: string): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: { animal: this.animal, reportId, commentId, description },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
