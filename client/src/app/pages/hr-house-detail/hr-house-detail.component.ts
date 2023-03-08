import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from 'src/app/interfaces/house';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { HouseService } from 'src/app/services/house/house.service';
import { selectHouseById } from 'src/app/store/house/house.selector';

@Component({
  selector: 'app-hr-house-detail',
  templateUrl: './hr-house-detail.component.html',
  styleUrls: ['./hr-house-detail.component.css']
})
export class HrHouseDetailComponent implements OnInit {
  house$: Observable<House> | undefined;
  houseId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private houseService: HouseService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.houseService.getHouses();
    this.houseId = this.route.snapshot.paramMap.get('id') as string;
    this.house$ = this.store.pipe(select(selectHouseById(this.houseId))) as Observable<House>;
    // console.log(this.house$)
  }

  onClickCard(rid: string): void {
    this.router.navigate(['/hrHousingManagement/house/' + this.houseId + '/report/' + rid]);
  }
}
