import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ListingService } from '@app/_services/listing.service';

@Component({ templateUrl: 'listing.component.html' })
export class ListingComponent implements OnInit {
    listings = null;

    constructor(private listingService: ListingService) {}

    ngOnInit() {
        this.listingService.getAll()
            .pipe(first())
            .subscribe(listings => this.listings = listings);
    }

    deleteUser(id: string) {
        const listings = this.listings.find(x => x.id === id);
        listings.isDeleting = true;
        this.listingService.delete(id)
            .pipe(first())
            .subscribe(() => this.listings = this.listings.filter(x => x.id !== id));
    }
}