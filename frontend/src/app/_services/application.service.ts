import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { application } from '@app/_models/application';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private applicationSubject: BehaviorSubject<application>; //replace other utilizations of this var 
  public application: Observable<application>;

  constructor(
      private router: Router, //implement later to navigate out of the page
      private http: HttpClient
  ) {
      this.applicationSubject = new BehaviorSubject<application>(JSON.parse(localStorage.getItem('application'))); //storing new application objects in local browser storage
      this.application = this.applicationSubject.asObservable();
  }

  public get applicationValue(): application { //getter helper method to return the values of the application 
      return this.applicationSubject.value;
  }

  register(application: application) { //CRUD: create a new application 
      return this.http.post(`${environment.apiUrl}/application/register`, application);
  }

  getAll() { // to get list of all applications
      return this.http.get<application[]>(`${environment.apiUrl}/applications`);
  }

  getById(id: string) { //helper function to get application by id
      return this.http.get<application>(`${environment.apiUrl}/applications/${id}`);
  }

  update(id, params) { //CRUD: update function used in editing application info 
      return this.http.put(`${environment.apiUrl}/applications/${id}`, params)
          .pipe(map(x => {
              // update stored user if the logged in user updated their own record
              if (id == this.applicationValue.id) { //here this.jobValue refers to the above defined get jobValue() function
                  // update local storage
                  const application = { ...this.applicationValue, ...params };
                  localStorage.setItem('application', JSON.stringify(application));

                  // publish updated job to subscribers
                  this.applicationSubject.next(application);
              }
              return x;
          }));
  }

  delete(id: string) { //CRUD: Delete function to delete a application's account
      return this.http.delete(`${environment.apiUrl}/applications/${id}`)
          .pipe(map(x => {
              // auto logout if the logged in user deleted their own record
              if (id == this.applicationValue.id.toString()) {
                  //this.logout();
                  console.log("application account deleted")
              }
              return x;
          }));
  }
}
