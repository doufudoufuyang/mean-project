import { Component, OnChanges, OnInit } from '@angular/core';
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
  profilePicture: string="";
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
  emergencyContacts: any[] = [{
    "firstName": "",
    "lastName": "",
    "middleName": "",
    "phone": "",
    "email": "",
    "relationship": ""
  }];
  documents: any[] = [];
  opt!: string


  users$: Observable<any> = this.store.select(selectEmployee);
  data: any = {}
  name: string = ''
  constructor(private fileService: FileService, private store: Store, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const token = window.localStorage.getItem('JWT_TOKEN');
    console.log(token)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    });
    fetch('http://localhost:3000/user/getEmployeeInfo', {
      method: 'GET',
      headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('data =', data)
        const employeeInfo = data.user
        this.store.dispatch(EmployeeAction.setEmployeeInfo({ employeeInfo }))
      })

    // setTimeout(() => {
    this.users$
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((user: any) => {
        if (user) {
          this.profile = user.profile
          this.status = user.status
          this.username = user.username
          this.email = user.email
          if (user.profile) {
            this.userOpt = user.profile.optReceipt;
            this.userPic = user.profile.pic;
            if (user.profile.driverLicense) {
              this.userDriverlicense = user.profile.driverLicense.document;
            }
          }
        }
      });
    // }, 2000);


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
  onFileUpload(e: Event) {
    e.preventDefault();
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    console.log('imageForm=', fileForm)
    this.fileService.fileUpload(fileForm)
      .pipe(catchError((err) => of([{ err }])))
      .subscribe((fileName: any) => {
        console.log('fileName =', fileName[0])
        window.alert('File uploaded')
      })
  }
  removeEmergencyContact(index: number) {
    // event.preventDefault()
    this.emergencyContacts.splice(index, 1);
  }
  addEmergencyContact() {
    // event.preventDefault()
    const newContact = {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: ''
    };
    this.emergencyContacts.push(newContact);
  }

  submitForm(): void {
      if (this.workAuthorization !== 'other') {
      this.visaTitle = this.workAuthorization;
    }
    const profile = {
      "firstName": this.firstName,
      "step": 2,
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
      "emergencyContacts": this.emergencyContacts,
      "driverLicense": {
        "number": this.driverLicenseNumber,
        "expireDate": this.driverLicenseExpiration,
        "document": this.driverLicenseDocument
      },
              "title": this.visaTitle,
      "startDate":this.visaStartDate,
      "endDate": this.visaEndDate,
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
      body: JSON.stringify({ "profileData": profile })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // this.router.navigate(['employeeVisa'])
        window.location.reload()

        // this.http.get('http://localhost:4200/user/getEmployeeInfo')
        //   .subscribe((user: any) => {
        //     console.log('user =', user)
        //     this.store.dispatch(EmployeeAction.setEmployeeInfo(user))
        //     this.router.navigate(['onboard'])
        //   })


      })
      .catch(error => {
        console.error('Error:', error);
      });

    // this.http.post('http://localhost:3000/user/profile', { "profileData": profile })
    //   .subscribe((result: any) => {
    //     console.log('result =', result)
    //   })

  }

  navigateToEmployeeVisa() {
    this.router.navigate(['employeeVisa'])
  }
}
