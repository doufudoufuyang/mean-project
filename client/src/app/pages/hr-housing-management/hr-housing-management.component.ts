import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { House } from 'src/app/interfaces/house';
import { HouseService } from 'src/app/services/house/house.service';
import { selectHouses } from 'src/app/store/house/house.selector';
import { MatDialog } from '@angular/material/dialog';
import { HouseDialogComponent } from 'src/app/components/house-dialog/house-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hr-housing-management',
  templateUrl: './hr-housing-management.component.html',
  styleUrls: ['./hr-housing-management.component.css']
})
export class HrHousingManagementComponent implements OnInit {
  houses$: Observable<House[]> = this.store.select(selectHouses);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private houseService: HouseService,
    private store: Store,
    private router : Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.houseService.getHouses();
  }

  openHouseDialog(): void {
    this.dialog.open(HouseDialogComponent);
  }

  onDeleteClick(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.houseService.deleteHouse(id)
      .subscribe((message: string) => {
        this._snackBar.open(message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000,
        });
      });
  }

  onCardClick(id: string): void {
    this.router.navigate(['hrHousingManagement/house/' + id]);
  }
}
