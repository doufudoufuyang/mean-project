import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { House } from 'src/app/interfaces/house';
import { HouseAction } from 'src/app/store/house/house.action';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private url = 'http://localhost:3000/user/';

  constructor(private http: HttpClient, private store: Store) { }

  getHouses(): void {
    this.http.get(this.url + 'houses')
      .subscribe({
        next: (res: any) => {
          const houses: any[] = res.houses;
          console.log(houses);
          this.store.dispatch(HouseAction.getHouses({ houses }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
  }

  getHouse(id: string): void {
    this.http.get(this.url + 'house/' + id);
  }

  addHouse(house: House): void {
    this.http.post(this.url + 'house', house)
      .subscribe({
        next: (res: any) => {
          const house = res.house;
          this.store.dispatch(HouseAction.addHouse({ house }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
  }

  updateHouse(requestBody: any): void {
    this.http.put(this.url + 'house', requestBody)
      .subscribe({
        next: (res: any) => {
          const house = res.house;
          console.log(house);
          this.store.dispatch(HouseAction.updateHouse({ house }));
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
  }

  deleteHouse(id: string): Subject<string> {
    const subject = new Subject<string>();
    this.http.delete(this.url + 'house/' + id)
      .subscribe({
        next: (res: any) => {
          const id = res.house._id;
          this.store.dispatch(HouseAction.deleteHouse({ id }));
          subject.next(res.message);
          subject.complete();
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
    return subject;
  }
}
