import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Financial } from '@app/_models/financial';

@Injectable({ providedIn: 'root' })
export class FinancialService {
    private financialSubject: BehaviorSubject<Financial>; //replace other utilizations of this var 
    public finance: Observable<Financial>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.financialSubject = new BehaviorSubject<Financial>(JSON.parse(localStorage.getItem('finance'))); //storing new class objects in local browser storage
        this.finance = this.financialSubject.asObservable();
    }

    public get financeValue(): Financial { //getter helper method to return the values of the Financial record 
        return this.financialSubject.value;
    }

    register(finance: Financial) { //CRUD: create a new financial record 
        return this.http.post(`${environment.apiUrl}/finance/register`, finance);
    }

    getAll() { // to get list of all financial records
        return this.http.get<Financial[]>(`${environment.apiUrl}/finance`);
    }

    getById(id: string) { //helper function to get record by id
        return this.http.get<Financial>(`${environment.apiUrl}/finance/${id}`);
    }

    update(id, params) { //CRUD: update function used in editing record info 
        return this.http.put(`${environment.apiUrl}/finance/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.financeValue.id) { //here this.staffValue refers to the above defined get staffValue() function
                    // update local storage
                    const finance = { ...this.financeValue, ...params };
                    localStorage.setItem('finance', JSON.stringify(finance));

                    // publish updated job to subscribers
                    this.financialSubject.next(finance);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete a financial record 
        return this.http.delete(`${environment.apiUrl}/finance/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.financeValue.id) {
                    //this.logout();
                    console.log("finance record deleted")
                }
                return x;
            }));
    }
}