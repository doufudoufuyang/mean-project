import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmployeeAction } from 'src/app/store/employee/employee.action';
import { selectEmployee } from 'src/app/store/employee/employee.selector';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})


export class OnboardComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  middleName!: string;
  preferredName!: string;
  profilePicture: string = 'https://via.placeholder.com/150';
  apt!: string;
  street!: string;
  city!: string;
  state!: string;
  zip!: string;
  cellPhone!: string;
  workPhone!: string;
  carMake!: string;
  carModel!: string;
  carColor!: string;
  email!: string;
  ssn!: string;
  dateOfBirth!: Date;
  gender!: string;
  citizenship!: string;
  workAuthorization!: string;
  visaTitle!: string;
  visaStartDate!: Date;
  visaEndDate!: Date;
  hasDriverLicense!: boolean;
  driverLicenseNumber!: string;
  driverLicenseExpiration!: Date;
  driverLicenseDocument!: string;
  referenceFirstName!: string;
  referenceLastName!: string;
  referenceMiddleName!: string;
  referencePhone!: string;
  referenceEmail!: string;
  referenceRelationship!: string;
  emergencyContacts: any[] = [];
  documents: any[] = [];
  opt!: string


  users$: Observable<any> = this.store.select(selectEmployee);
  data: any = {}
  name: string = ''
  constructor(private fileService: FileService, private store: Store, private http: HttpClient, private router: Router) { }


  ngOnInit() {

    // this.http
    //   .get('https://jsonplaceholder.typicode.com/users')
    //   .subscribe((users: any) => {
    //     // Retrieve data and map it to user slice of state
    //     this.store.dispatch(UserAction.getUsers({ users }));
    //   });

    // console.log('users$=', this.users$);
    // this.users$
    //   .pipe(catchError((err) => of([{ err }])))
    //   .subscribe((users: any) => {
    //     if (users.length !== 0) {
    //       this.data = users[0]
    //       this.name = users[0].name
    //       console.log('users =', users)
    //       console.log('this.name =', this.name)
    //     }
    //   });

    this.users$
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((user: any) => {
        if (user) {
          console.log('Inside this.users$')
          this.profile = user.profile
          this.status = user.status
          this.username = user.username
          if (user.profile) {
            this.userOpt = user.profile.optReceipt;
            this.userPic = user.profile.pic;
            if (user.profile.driverLicense) {
              this.userDriverlicense = user.profile.driverLicense.document;
            }
          }
        }
      });

    //If approved, navigate to XXX
    this.status === 'Approved' && this.router.navigate(['/'])
  }

  userOpt: string = '';
  userPic: string = '';
  userDriverlicense: string = '';
  username: string = 'aaron'
  status: string = 'Not Started'
  // status: string = 'Rejected'
  // status: string = 'Pending'
  // status: string = 'Approved'
  profile: any = {
    firstName: 'Aaron',
    lastName: 'Wang',
    address: 'NY',
    cellPhoneNumber: '123456789',
    car: 'Toyota',
    email: 'aaronub2008@gmail.com',
    SSN: '123456',
    dateOfBirth: '01/01/2022',
    gender: 'male',
    driverLicense: 'NG12345',
    reference: 'Beaconfire',
    emergencyContacts: 'Dora'
  }


  fileList: string[] = [];
  showFileList() {
    const response = this.fileService.fileListService()
    response
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((file: any) => {
        // console.log('file=', file)
        const userFile = [...file].filter((elem: any) => {
          if (elem === this.userOpt || elem === this.userPic || elem === this.userDriverlicense) {
            console.log('inside filter true')
            return true
          }
          console.log('inside filter false')
          return false
        })
        this.fileList = userFile
      })
  }


  fileObj: any;
  fileUrl: string = '';
  onFilePickedPic(event: any): void {
    const FILE = event.target.files[0];
    this.fileObj = FILE;
    console.log('FILE.name =', FILE.name)
    this.profilePicture = FILE.name
  }
  onFilePickedDri(event: any): void {
    const FILE = event.target.files[0];
    this.fileObj = FILE;
    console.log('FILE.name =', FILE.name)
    this.driverLicenseDocument = FILE.name
  }
  onFilePickedOpt(event: any): void {
    const FILE = event.target.files[0];
    this.fileObj = FILE;
    console.log('FILE.name =', FILE.name)
    this.opt = FILE.name
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


  submitForm(): void {
    const profile = {
      "firstName": this.firstName,
      "step": 0,
      "nextStep": 1,
      "lastName": this.lastName,
      "middleName": this.middleName,
      "preferredName": this.preferredName,
      "pic": this.profilePicture,
      "address": {
        "apt": this.apt,
        "street": this.street,
        "city": this.city,
        "state": this.state,
        "zip": this.zip
      },
      "cellPhoneNumber": this.cellPhone,
      "workPhoneNumber": this.workPhone,
      "car": {
        "make": this.carMake,
        "model": this.carModel,
        "color": this.carColor
      },
      "SSN": this.ssn,
      "dateOfBirth": this.dateOfBirth,
      "gender": this.gender,
      "reference": {
        "firstName": this.referenceFirstName,
        "lastName": this.referenceLastName,
        "middleName": this.referenceMiddleName,
        "phone": this.referencePhone,
        "email": this.referenceEmail,
        "relationship": this.referenceRelationship
      },
      "emergencyContacts": [
        {
          "firstName": "Bob",
          "lastName": "Smith",
          "middleName": "",
          "phone": "555-5555",
          "email": "bob@example.com",
          "relationship": "spouse"
        },
        {
          "firstName": "Alice",
          "lastName": "Johnson",
          "middleName": "Marie",
          "phone": "555-5555",
          "email": "alice@example.com",
          "relationship": "friend"
        }
      ],
      "driverLicense": {
        "number": this.driverLicenseNumber,
        "expireDate": this.driverLicenseExpiration,
        "document": this.driverLicenseDocument
      },
      "optReceipt": this.opt
    }
    const token = window.localStorage.getItem('JWT_TOKEN');
    console.log(token)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    });
    fetch('http://localhost:3000/user/profile', {
      method: 'POST',
      headers,
      body: JSON.stringify({"profileData": profile })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.router.navigate(['employeeVisa'])
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  navigateToEmployeeVisa() {
    this.router.navigate(['employeeVisa'])
  }
}
