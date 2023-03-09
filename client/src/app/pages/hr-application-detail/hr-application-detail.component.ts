import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { catchError, of } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hr-application-detail',
  templateUrl: './hr-application-detail.component.html',
  styleUrls: ['./hr-application-detail.component.css']
})
export class HrApplicationDetailComponent implements OnInit {
  employee: any;
  profile: any;
  feedback: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:3000/hr/employee/' + employeeId)
      .subscribe((res: any) => {
        this.employee = res.data;
        this.profile = this.employee.profile;
      });
  }

  fileList: string[] = [];
  showFileList() {
    const response = this.fileService.fileListService()
    response
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((file: any) => {
        console.log('file=', file)
        const userFile = [...file].filter((elem: any) => {
          if (elem === this.profile.userOpt || elem === this.profile.userPic || elem === this.profile.userDriverlicense) {
            console.log('inside filter true')
            return true
          }
          console.log('inside filter false')
          return false
        })
        this.fileList = userFile
      })
  }

  onApprove(): void {
    const requestBody = { id: this.employee._id };
    this.http.put('http://localhost:3000/hr/approveApplication', requestBody)
      .subscribe({
        next: (res: any) => {
          this._snackBar.open(res.message, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000,
          })
          this.router.navigate(['hrHiringManagement']);
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
  }

  onReject(): void {
    const requestBody = { id: this.employee._id, feedback: this.feedback };
    this.http.put('http://localhost:3000/hr/rejectApplication', requestBody)
      .subscribe({
        next: (res: any) => {
          this._snackBar.open(res.message, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000,
          })
          this.router.navigate(['hrHiringManagement']);
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
  }
}
