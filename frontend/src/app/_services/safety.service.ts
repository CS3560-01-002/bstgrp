import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Safety } from '@app/_models/safety';

@Injectable({ providedIn: 'root' })
export class SafetyService {
    private safetySubject: BehaviorSubject<Safety>; //replace other utilizations of this var 
    public issue: Observable<Safety>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.safetySubject = new BehaviorSubject<Safety>(JSON.parse(localStorage.getItem('issue')));
        this.issue = this.safetySubject.asObservable();
    }

    public get issueValue(): Safety {
        return this.safetySubject.value;
    }

    register(issue: Safety) { //CRUD: create job api call
        return this.http.post(`${environment.apiUrl}/safety/register`, issue);
    }

    getAll() { //call maintenance api to get list of all jobs
        return this.http.get<Safety[]>(`${environment.apiUrl}/safety/issues`);
    }

    getById(id: string) { //helper function to get maintenance job by id
        return this.http.get<Safety>(`${environment.apiUrl}/safety/issues/${id}`);
    }

    update(id, params) { //CRUD: update job
        return this.http.put(`${environment.apiUrl}/safety/issues/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.issueValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                    // update local storage
                    const issue = { ...this.issueValue, ...params };
                    localStorage.setItem('issue', JSON.stringify(issue));

                    // publish updated job to subscribers
                    this.safetySubject.next(issue);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to resolve safety issue
        return this.http.delete(`${environment.apiUrl}/maintenance/jobs/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.issueValue.id) {
                    //this.logout();
                    console.log("issue resolved")
                }
                return x;
            }));
    }
}