import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from 'src/app/services/house/house.service';
import { House } from 'src/app/interfaces/house';

@Component({
  selector: 'app-house-dialog',
  templateUrl: './house-dialog.component.html',
  styleUrls: ['./house-dialog.component.css']
})
export class HouseDialogComponent {
  form: FormGroup = this.formBuilder.group({
    address: this.formBuilder.group({
      apt: '',
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    }),
    landlord: this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),
    facilityInfo: this.formBuilder.group({
      bedNum: [, Validators.required],
      mattressNum: [, Validators.required],
      tableNum: [, Validators.required],
      chairNum: [, Validators.required],
    }),
  })

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService
  ) {}

  onSubmit(): void {
    const house: House = this.form.getRawValue();
    console.log(house);
    this.houseService.addHouse(house);
  }
}
