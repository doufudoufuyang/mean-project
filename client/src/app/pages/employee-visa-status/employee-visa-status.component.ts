import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { FileService } from "../../services/file.service";
import { Store } from "@ngrx/store";
import { selectEmployee } from "../../store/employee/employee.selector";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-visa-status',
  templateUrl: './employee-visa-status.component.html',
  styleUrls: ['./employee-visa-status.component.css']
})
export class EmployeeVisaStatusComponent implements OnInit {

  users$: Observable<any> = this.store.select(selectEmployee);
  constructor(private fileService: FileService, private store: Store, private http: HttpClient) { }

  ngOnInit(): void {
    this.users$
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((user: any) => {
        if (user) {
          console.log('inside this.users$')
          this.username = user.username
          if (user.profile) {
            this.next = user.profile.nextStep
          }
        }
      })
  }

  nextStep = {
    0: "submit onboarding application",
    1: "wait for HR approval",
    2: "submit OPT EAD",
    3: "wait for HR approval",
    4: "submit I-983",
    5: "wait for HR approval",
    6: "submit I-20",
    7: "wait for HR approval",
  };
  next = 2; //get from profile.nextStep;

  getStep(step: number | string): string | number {
    return this.nextStep[step as keyof typeof this.nextStep];
  }

  optEAD: String = ''
  i983: String = '';
  i20: String = '';
  username: String = '';


  fileObj: any;
  onFilePicked(event: any): void {
    // console.log('event.target.name=', event.target.name)
    const inputName = event.target.name
    const FILE = event.target.files[0];
    this.fileObj = FILE;
    console.log('FILE.name =', FILE.name)
    if (inputName === 'optEAD') {
      this.optEAD = FILE.name
    }
    if (inputName === 'i983') {
      this.i983 = FILE.name
    }
    if (inputName === 'i20') {
      this.i20 = FILE.name
    }
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
        console.log('this.username =', this.username)
      })

    this.http.put('http://localhost:3000/user/employeeVisa',
      { username: this.username, optEAD: this.optEAD, i983: this.i983, i20: this.i20 })
      .subscribe((profile: any) => {
        console.log('profile =', profile)
      });

    // fetch('http://localhost:3000/user/employeeVisa', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username: this.username, optEAD: this.optEAD, i983: this.i983, i20: this.i20 })
    // })

  }

}
