import { Component, OnInit } from '@angular/core';
import { ListingService } from '@app/_services/listing.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-public-listings',
  templateUrl: './public-listings.component.html',
  styleUrls: ['./public-listings.component.less']
})
export class PublicListingsComponent implements OnInit {
//define logic to read from listings service without the need for user authentication
  publicListings = null;


  constructor(

    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.listingService.getAllPublic() //getAll() calls authorize() in the backend to verify user
        .pipe(first())
        .subscribe(listings => this.publicListings = listings);
  }

}
