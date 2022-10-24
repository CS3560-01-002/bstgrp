import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Lease } from '@app/_models/lease';

@Injectable({ providedIn: 'root' })
export class LeaseService {
    private leaseSubject: BehaviorSubject<Lease>; //replace other utilizations of this var 
    public lease: Observable<Lease>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.leaseSubject = new BehaviorSubject<Lease>(JSON.parse(localStorage.getItem('lease')));
        this.lease = this.leaseSubject.asObservable();
    }

    public get leaseValue(): Lease { //helper get function to retrieve lease params
        return this.leaseSubject.value;
    }

    register(lease: Lease) { //CRUD: create lease api call
        return this.http.post(`${environment.apiUrl}/leases/create`, lease);
    }

    getAll() { //call maintenance api to get list of all active leases
        return this.http.get<Lease[]>(`${environment.apiUrl}/leases`);
    }

    getById(id: string) { //helper function to get lease record by id
        return this.http.get<Lease>(`${environment.apiUrl}/leases/${id}`);
    }

    update(id, params) { //CRUD: update job
        return this.http.put(`${environment.apiUrl}/leases/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.leaseValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                    // update local storage
                    const lease = { ...this.leaseValue, ...params };
                    localStorage.setItem('lease', JSON.stringify(lease));

                    // publish updated job to subscribers
                    this.leaseSubject.next(lease);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to terminate lease
        return this.http.delete(`${environment.apiUrl}/leases/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.leaseValue.id) {
                    //this.logout();
                    console.log("lease terminated")
                }
                return x;
            }));
    }
}