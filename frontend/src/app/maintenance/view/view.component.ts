import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
//import { User } from '../../_models/user';
import { User } from '@app/_models/user';


import { AccountService } from '@app/_services/account.service';
import { ListingService } from '@app/_services/listing.service';
import { MaintenanceService } from '@app/_services/maintenance.service';

//first implement the typescript logic, and then reference the vars from the html
@Component({
  selector: 'app-view',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view.component.less']
})

//gets the current user object and checks for the user_id
export class ViewMaintenanceComponent implements OnInit {

  user: User;
  account_type: string;
  issues = null;

  constructor(private accountService: AccountService, private maintenanceService: MaintenanceService) {
    this.user = this.accountService.userValue;
    this.account_type = this.user.account_type;
   } //if accountType is admin, fill issues by calling getAll(), otherwise 

  ngOnInit(): void {
    // if(this.account_type === 'admin') {
    this.maintenanceService.getAll()
            .pipe(first())
            .subscribe(issues => this.issues = issues);
    console.log(this.issues);
  // else {
  //   this.maintenanceService.getIssuesByUserId(this.user.user_id)
  //           .pipe(first())
  //           .subscribe(issues => this.issues = issues);
  // }

}
}

// import { Component, OnInit } from '@angular/core';
// import { first } from 'rxjs/operators';
// import { User } from '../_models';

// import { ListingService } from '@app/_services/listing.service';
// import { AccountService } from '@app/_services/account.service';

// @Component({ templateUrl: 'listing.component.html' })
// export class ListingComponent implements OnInit { 
//     listings = null;
//     user: User;
//     accountType: string;
//     adminAccess: boolean;
//     constructor(private listingService: ListingService, private accountService: AccountService) {
//         this.user = this.accountService.userValue;
//         this.accountType = this.user.account_type;
//         if (this.accountType == 'admin') {
//             this.adminAccess = true;
//         }
//     }

//     ngOnInit() {
//         this.listingService.getAll()
//             .pipe(first())
//             .subscribe(listings => this.listings = listings);
//     }

//     deleteListing(id: string) { //function to delete user via html: is called upon button click
//         const listings = this.listings.find(x => x.id === id);
//         listings.isDeleting = true;
//         this.listingService.delete(id)
//             .pipe(first())
//             .subscribe(() => this.listings = this.listings.filter(x => x.id !== id));
//     }
// }