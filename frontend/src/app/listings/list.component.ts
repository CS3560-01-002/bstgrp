import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ListingService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    listings = null;

    constructor(private listingService: ListingService) {}

    ngOnInit() {
        this.listingService.getAll()
            .pipe(first())
            .subscribe(listings => this.listings = listings);
    }

    deleteListing(id: string) {
        const listng = this.listings.find(x => x.id === id);
        listing.isDeleting = true;
        this.listingService.delete(id)
            .pipe(first())
            .subscribe(() => this.listings = this.listings.filter(x => x.id !== id));
    }
}