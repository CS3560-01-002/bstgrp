import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Applicant } from '@app/_models/applicant';

@Injectable({ providedIn: 'root' })
export class ApplicantService {
    private applicantSubject: BehaviorSubject<Applicant>; //replace other utilizations of this var 
    public applicant: Observable<Applicant>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.applicantSubject = new BehaviorSubject<Applicant>(JSON.parse(localStorage.getItem('applicant'))); //storing new class objects in local browser storage
        this.applicant = this.applicantSubject.asObservable();
    }

    public get applicantValue(): Applicant{ //getter helper method to return the values of the applicant
        return this.applicantSubject.value;
    }

    register(applicant: Applicant) { //CRUD: create a new staff account 
        return this.http.post(`${environment.apiUrl}/applicants/register`, applicant);
    }

    getAll() { // to get list of all applicants
        return this.http.get<Applicant[]>(`${environment.apiUrl}/applicants`);
    }

    getById(id: string) { //helper function to get applicant by id
        return this.http.get<Applicant>(`${environment.apiUrl}/applicants/${id}`);
    }

    update(id, params) { //CRUD: update function used in editing applicant info 
        return this.http.put(`${environment.apiUrl}/applicants/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.applicantValue.id) { //here this.staffValue refers to the above defined get staffValue() function
                    // update local storage
                    const applicant = { ...this.applicantValue, ...params };
                    localStorage.setItem('staff', JSON.stringify(applicant));

                    // publish updated job to subscribers
                    this.applicantSubject.next(applicant);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete a tenant's account
        return this.http.delete(`${environment.apiUrl}/applicants/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.applicantValue.id) {
                    //this.logout();
                    console.log("applicant deleted")
                }
                return x;
            }));
    }
}