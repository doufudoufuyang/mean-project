import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { HouseService } from 'src/app/services/house/house.service';
import { selectHouseById } from 'src/app/store/house/house.selector';
import { Report } from 'src/app/interfaces/report';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { HrCommentDialogComponent } from 'src/app/components/hr-comment-dialog/hr-comment-dialog.component';

export interface HrCommentDialogData {
  reportId: string,
  commentId: string,
  description: string,
}

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
  styleUrls: ['./hr-report.component.css']
})
export class HrReportComponent implements OnInit {
  report!: Report;
  form: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
  });
  username!: string;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private http: HttpClient,
    private store: Store,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.houseService.getHouses();
    const houseId = this.route.snapshot.paramMap.get('hid') as string;
    const reportId = this.route.snapshot.paramMap.get('rid') as string;
    this.store.pipe(select(selectHouseById(houseId)))
      .subscribe(house => {
        house?.reports.forEach(report => {
          if (report._id === reportId) this.report = report;
        });
        console.log(this.report);
      });
    this.username = localStorage.getItem('username') as string;
  }

  onAddComment(id: string): void {
    const requestBody = {
      reportId: id,
      description: this.form.getRawValue().description,
    }
    console.log(requestBody);
    this.http.put('http://localhost:3000/user/report', requestBody)
      .subscribe({
        next: (res: any) => {
          this.report = res.report;
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
    this.form.reset();
  }

  onClose(id: string): void {
    const requestBody = {
      reportId: id,
      status: 'Closed',
    }
    this.http.put('http://localhost:3000/user/report', requestBody)
      .subscribe({
        next: (res: any) => {
          this.report = res.report;
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }

  openHrCommentDialog(reportId: string, commentId: string, description: string): void {
    const dialogRef = this.dialog.open(HrCommentDialogComponent,
      { data: { reportId, commentId, description } });

    dialogRef.afterClosed().subscribe(result => {
      result && (this.report = result);
    });
  }
}
