import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Contact } from '@app/_models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
    private contactSubject: BehaviorSubject<Contact>; //replace other utilizations of this var 
    public contact: Observable<Contact>;

    constructor(
        private router: Router, //implement later to navigate out of the page
        private http: HttpClient
    ) {
        this.contactSubject = new BehaviorSubject<Contact>(JSON.parse(localStorage.getItem('contact'))); //storing new class objects in local browser storage
        this.contact = this.contactSubject.asObservable();
    }

    public get contactValue(): Contact { //getter helper method to return the values of the contact object 
        return this.contactSubject.value;
    }

    register(contact: Contact) { //CRUD: create a new contact record 
        return this.http.post(`${environment.apiUrl}/contacts/register`, contact);
    }

    getAll() { // to get list of all contacts
        return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`);
    }

    getById(id: string) { //helper function to get contact by id
        return this.http.get<Contact>(`${environment.apiUrl}/contacts/${id}`);
    }

    update(id, params) { //CRUD: update function used in editing tenant info 
        return this.http.put(`${environment.apiUrl}/contact/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.contactValue.id) { //here this.staffValue refers to the above defined get staffValue() function
                    // update local storage
                    const contact = { ...this.contactValue, ...params };
                    localStorage.setItem('contact', JSON.stringify(contact));

                    // publish updated job to subscribers
                    this.contactSubject.next(contact);
                }
                return x;
            }));
    }

    delete(id: string) { //CRUD: Delete function to delete a tenant's account
        return this.http.delete(`${environment.apiUrl}/contact/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.contactValue.id) {
                    //this.logout();
                    console.log("contact record deleted")
                }
                return x;
            }));
    }
}