import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Unit } from '@app/_models/unit';

@Injectable({ providedIn: 'root' })
export class UnitService {
    private unitSubject: BehaviorSubject<Unit>; //replace other utilizations of this var 
    public listing: Observable<Unit>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.unitSubject = new BehaviorSubject<Unit>(JSON.parse(localStorage.getItem('listing')));
        this.listing = this.unitSubject.asObservable();
    }

    public get listingValue(): Unit{ //helper get function 
        return this.unitSubject.value;
    }

    createListing(listing: Unit) { //CRUD: create listing api call
        return this.http.post(`${environment.apiUrl}/listings/create`, listing);
    }

    getAll() { //call maintenance api to get list of all jobs
        return this.http.get<Unit[]>(`${environment.apiUrl}/listings`);
    }

    getById(id: string) { //helper function to get maintenance job by id
        return this.http.get<Unit>(`${environment.apiUrl}/listings/${id}`);
    }

    update(id, params) { //CRUD: update job
        return this.http.put(`${environment.apiUrl}/listings/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.listingValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                    // update local storage
                    const listing = { ...this.listingValue, ...params };
                    localStorage.setItem('listing', JSON.stringify(listing));

                    // publish updated job to subscribers
                    this.unitSubject.next(listing);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete listing
        return this.http.delete(`${environment.apiUrl}/listings/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.listingValue.id) { //calling the helper function to retrieve id
                    //this.logout();
                    console.log("listing deleted")
                }
                return x;
            }));
    }
}