import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileAction } from 'src/app/store/profile/profile.action';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = 'http://localhost:3000/hr/';

  constructor(private http: HttpClient, private store: Store) { }

  getProfiles(): void {
    this.http.get(this.url + 'profiles')
      .subscribe({
        next: (res: any) => {
          const profiles: any[] = res.data;
          console.log(profiles);
          this.store.dispatch(ProfileAction.getProfiles({ profiles }));
        }
      })
  }
}
