import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Staff } from '@app/_models/staff';

@Injectable({ providedIn: 'root' })
export class StaffService {
    private staffSubject: BehaviorSubject<Staff>; //replace other utilizations of this var 
    public staff: Observable<Staff>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.staffSubject = new BehaviorSubject<Staff>(JSON.parse(localStorage.getItem('staff'))); //storing new class objects in local browser storage
        this.staff = this.staffSubject.asObservable();
    }

    public get staffValue(): Staff { //getter helper method to return the values of the staff 
        return this.staffSubject.value;
    }

    register(staff: Staff) { //CRUD: create a new staff account 
        return this.http.post(`${environment.apiUrl}/staff/register`, staff);
    }

    getAll() { // to get list of all staff
        return this.http.get<Staff[]>(`${environment.apiUrl}/staff`);
    }

    getById(id: string) { //helper function to get staff by id
        return this.http.get<Staff>(`${environment.apiUrl}/staff/${id}`);
    }

    update(id, params) { //CRUD: update function used in editing tenant info 
        return this.http.put(`${environment.apiUrl}/staff/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.staffValue.id) { //here this.staffValue refers to the above defined get staffValue() function
                    // update local storage
                    const staff = { ...this.staffValue, ...params };
                    localStorage.setItem('staff', JSON.stringify(staff));

                    // publish updated job to subscribers
                    this.staffSubject.next(staff);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete a tenant's account
        return this.http.delete(`${environment.apiUrl}/staff/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.staffValue.id) {
                    //this.logout();
                    console.log("staff account deleted")
                }
                return x;
            }));
    }
}