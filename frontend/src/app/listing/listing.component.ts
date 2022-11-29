import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { user } from '../_models';

import { ListingService } from '@app/_services/listing.service';
import { AccountService } from '@app/_services/account.service';

@Component({ templateUrl: 'listing.component.html' })
export class ListingComponent implements OnInit {
    listings = null;
    user: user;
    accountType: string;
    adminAccess: boolean;
    constructor(private listingService: ListingService, private accountService: AccountService) {
        this.user = this.accountService.userValue;
        this.accountType = this.user.account_type;
        if (this.accountType == 'admin') {
            this.adminAccess = true;
        }
    }

    ngOnInit() {
        this.listingService.getAll()
            .pipe(first())
            .subscribe(listings => this.listings = listings);
    }

    deleteListing(id: string) { //function to delete user via html: is called upon button click
        const listings = this.listings.find(x => x.id === id);
        listings.isDeleting = true;
        this.listingService.delete(id)
            .pipe(first())
            .subscribe(() => this.listings = this.listings.filter(x => x.id !== id));
    }
}