import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { FileService } from "../../services/file.service";
import { Store } from "@ngrx/store";
import { selectEmployee } from "../../store/employee/employee.selector";

@Component({
  selector: 'app-employee-visa-status',
  templateUrl: './employee-visa-status.component.html',
  styleUrls: ['./employee-visa-status.component.css']
})
export class EmployeeVisaStatusComponent implements OnInit {

  users$: Observable<any> = this.store.select(selectEmployee);
  constructor(private fileService: FileService, private store: Store) { }

  ngOnInit(): void {
    this.users$
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((user: any) => {

      })
  }


  // optReceiptStatus: String = 'Pending';
  optReceiptStatus: String = 'Approved';
  // optReceiptStatus: String = 'Rejected';
  optEAD: String = ''
  optEADStatus: String = '';
  i20: String = '';
  i20Status: String = '';
  i983: String = '';
  i983Status: String = '';

  // test: any;

  fileObj: any;
  onFilePickedOptEAD(event: any): void {
    const FILE = event.target.files[0];
    this.fileObj = FILE;
    console.log('FILE.name =', FILE.name)
    this.optEAD = FILE.name
    // //Not working this way????
    // this[fileName] = FILE.name
  }







  onFileUpload() {
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    console.log('imageForm=', fileForm)
    this.fileService.fileUpload(fileForm)
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((fileName: any) => {
        console.log('fileName =', fileName[0])
      })


  }

}
