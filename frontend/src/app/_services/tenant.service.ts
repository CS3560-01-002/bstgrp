import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Tenant } from '@app/_models/tenant';

@Injectable({ providedIn: 'root' })
export class TenantService {
    private tenantSubject: BehaviorSubject<Tenant>; //replace other utilizations of this var 
    public tenant: Observable<Tenant>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.tenantSubject = new BehaviorSubject<Tenant>(JSON.parse(localStorage.getItem('tenant'))); //storing new tenant objects in local browser storage
        this.tenant = this.tenantSubject.asObservable();
    }

    public get tenantValue(): Tenant { //getter helper method to return the values of the tenant 
        return this.tenantSubject.value;
    }

    register(tenant: Tenant) { //CRUD: create a new tenant 
        return this.http.post(`${environment.apiUrl}/tenant/register`, tenant);
    }

    getAll() { // to get list of all tenants
        return this.http.get<Tenant[]>(`${environment.apiUrl}/tenants`);
    }

    getById(id: string) { //helper function to get tenant by id
        return this.http.get<Tenant>(`${environment.apiUrl}/tenants/${id}`);
    }

    update(id, params) { //CRUD: update function used in editing tenant info 
        return this.http.put(`${environment.apiUrl}/tenants/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.tenantValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                    // update local storage
                    const tenant = { ...this.tenantValue, ...params };
                    localStorage.setItem('tenant', JSON.stringify(tenant));

                    // publish updated job to subscribers
                    this.tenantSubject.next(tenant);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete a tenant's account
        return this.http.delete(`${environment.apiUrl}/tenants/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.tenantValue.id) {
                    //this.logout();
                    console.log("tenant account deleted")
                }
                return x;
            }));
    }
}