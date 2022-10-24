import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Maintenance } from '@app/_models/maintenance';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
    private maintenanceSubject: BehaviorSubject<Maintenance>; //replace other utilizations of this var 
    public job: Observable<Maintenance>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.maintenanceSubject = new BehaviorSubject<Maintenance>(JSON.parse(localStorage.getItem('job')));
        this.job = this.maintenanceSubject.asObservable();
    }

    public get jobValue(): Maintenance {
        return this.maintenanceSubject.value;
    }

    register(job: Maintenance) { //CRUD: create job api call
        return this.http.post(`${environment.apiUrl}/maintenance/register`, job);
    }

    getAll() { //call maintenance api to get list of all jobs
        return this.http.get<Maintenance[]>(`${environment.apiUrl}/maintenance/jobs`);
    }

    getById(id: string) { //helper function to get maintenance job by id
        return this.http.get<Maintenance>(`${environment.apiUrl}/maintenance/jobs/${id}`);
    }

    update(id, params) { //CRUD: update job
        return this.http.put(`${environment.apiUrl}/maintenance/jobs/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.jobValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                    // update local storage
                    const job = { ...this.jobValue, ...params };
                    localStorage.setItem('job', JSON.stringify(job));

                    // publish updated job to subscribers
                    this.maintenanceSubject.next(job);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete job 
        return this.http.delete(`${environment.apiUrl}/maintenance/jobs/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.jobValue.id) {
                    //this.logout();
                    console.log("job deleted")
                }
                return x;
            }));
    }
}