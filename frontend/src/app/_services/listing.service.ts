import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Unit } from '@app/_models/unit';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private listingSubject: BehaviorSubject<Unit>;
  public listing: Observable<Unit>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.listingSubject = new BehaviorSubject<Unit>(JSON.parse(localStorage.getItem('listing')));
    this.listing = this.listingSubject.asObservable();
  }

  public get listingValue(): Unit {
    return this.listingSubject.value;
  }

  register(listing: Unit) {
    return this.http.post(`${environment.apiUrl}/listings/register`, listing);
  }

  getAll() { //get function add comment
    return this.http.get<Unit[]>(`${environment.apiUrl}/listings`);
  }

  getAllPublic() {
    return this.http.get<Unit[]>(`${environment.apiUrl}/listings/public`);
  }

  getById(id: string) {
    return this.http.get<Unit>(`${environment.apiUrl}/listings/${id}`);
  }

  // needs to be looked over
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/listings/${id}`, params)
      .pipe(map(x => {
        // update local storage
        const listing = { ...this.listingValue, ...params };
        localStorage.setItem('listing', JSON.stringify(listing));

        // publish updated user to subscribers
        this.listingSubject.next(listing);

        return x;
      }));
  }

  // needs to be looked over
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/listings/${id}`)
      .pipe(map(x => {
        // // auto logout if the logged in user deleted their own record
        // if (id == this.userValue.id) {
        //     this.logout();
        // }
        return x;
      }));
}
}