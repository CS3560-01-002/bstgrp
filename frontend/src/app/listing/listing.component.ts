import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingService } from '@app/_services/listing.service';
import { AccountService } from '@app/_services/account.service';

@Component({ templateUrl: 'listing.component.html' })
export class ListingComponent implements OnInit {
    listings = null;
    user: User;
    accountType: string;
    adminAccess: boolean;
    formSearch: FormGroup;

    constructor(
        private listingService: ListingService, 
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        ) {
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

        this.formSearch = this.formBuilder.group({ //might be rendered redundant based on the example implementation of the search bar example
            unit_no: ['', Validators.required],
            // bedrooms: ['', Validators.required],
            // bathrooms: ['', Validators.required],
            // air_condition: ['', Validators.required],
            // heating: ['', Validators.required],
            // floor: ['', Validators.required],
            // address: ['', Validators.required],
            // monthly_rate: ['', Validators.required],
            // sq_footage: ['', Validators.required],
            // availability: ['', Validators.required],

        });
    
    }

    onSubmit() {
        console.log(this.formSearch.value);
        // this.submitted = true;

        // // reset alerts on submit
        // this.alertService.clear();

        // // stop here if form is invalid
        // if (this.formListing.invalid) {
        //     return;
        // }

        // this.loading = true;
        // if (this.isAddMode) {
        //     this.createUnit();
        // } else {
        //     this.updateUnit();
        // }
    }

    deleteListing(id: string) { //function to delete user via html: is called upon button click
        const listings = this.listings.find(x => x.id === id);
        listings.isDeleting = true;
        this.listingService.delete(id)
            .pipe(first())
            .subscribe(() => this.listings = this.listings.filter(x => x.id !== id));
    }
}