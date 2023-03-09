import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent {

  constructor(
    private fb : FormBuilder,
    private _snackBar : MatSnackBar,
    private http : HttpClient
  ){}

  invitationForm : FormGroup = this.fb.group({
    name : ['', Validators.required],
    email: ['', Validators.required]
  })

  invitations: any[] = []
  displayedColumns: string[] = ['name', 'email', 'token', 'status'];

  ngOnInit(){
    this.fetch()
  }

  fetch(){
    console.log('fetch all invitations!!!')
    this.http.get('http://localhost:3000/hr/getAllInvitations')
    .subscribe({
      next: (data : any) => {
        this.invitations = data.invitations
        console.log('invitations: ', this.invitations)
      },
      error: (error) => {
        console.log('fail to fetch all invitations')
      }
    })
  }

  invite(){
    const requestBody = this.invitationForm.getRawValue()
    console.log('send invitation to,', requestBody)
    this.http.post('http://localhost:3000/user/sendInvitation', requestBody)
    .subscribe({
      next: (data: any) => {
        this._snackBar.open('Success', 'Invitation Sent')
        this.fetch()
      },
      error : (error) => {
        this._snackBar.open('Error', 'Fail to send invitation')
      },
      complete: () => { }
    })
  }
}
