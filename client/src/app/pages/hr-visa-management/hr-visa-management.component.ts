import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { FileService } from 'src/app/services/file.service';
import { Observable, catchError, of } from 'rxjs';
@Component({
  selector: 'app-hr-visa-management',
  templateUrl: './hr-visa-management.component.html',
  styleUrls: ['./hr-visa-management.component.css']
})

export class HrVisaManagementComponent {
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
  constructor(
    private fileService: FileService,
    // private store: Store,
    // private route: ActivatedRoute,
    // private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  getStep(step:number|string):string | number
  {
    return this.nextStep[step as keyof typeof this.nextStep];
  }
  searchForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });
  profiles: any[] = []

  ngOnInit() {
    fetch(`http://localhost:3000/hr/inProgressVisas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJlbWFpbCI6ImRhejAwNEB1Y3NkLmVkdSIsImlhdCI6MTY3ODE1NTE1MywiZXhwIjoxNjc4MTY1OTUzfQ.QRtihBwAhBvidh4scWNEv6GdiJY0AcgkxXPy7UNr_0g',
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        this.profiles = res.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  // getDocumnt(){
  //   const d = this.profiles.map((p)=>{
  //     switch(p.nextStep){
  //        case 1:return p.optReceipt,
  //         case 3:return p.optEAD,
  //         case 5: return p.i983,
  //         case 7:return p.i20
  //     }
    
  //   })
  //   const response = this.fileService.fileListService()
  //   response
  //     .pipe(catchError((err) => of([{ err }])))
  //     .subscribe((file: any) => {
  //       // console.log('file=', file)
  //       const userFile = [...file].filter((elem: any) => {
  //         if (elem === this.userOpt || elem === this.userPic || elem === this.userDriverlicense) {
  //           console.log('inside filter true')
  //           return true
  //         }
  //         console.log('inside filter false')
  //         return false
  //       })
  //       this.fileList = userFile
  //     })
  // }
}
