import { Component, OnInit } from '@angular/core';

 import { first } from 'rxjs/operators';
// import { User } from '../_models';
import { ListingService } from '@app/_services/listing.service';
import { Unit } from '@app/_models/unit';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {
  //define the listings here and show the remainng attrs


    //listing: Unit;
    //listing: Unit;
    listing: Unit;
    unit = null;
    accountType: string;
    adminAccess: boolean;
    //dataReady: boolean;
    id: string;

    constructor(
      private listingService: ListingService,
      private route: ActivatedRoute,
      
    ) {
         //private route: ActivatedRoute,
    }


    ngOnInit() {
      this.id = this.route.snapshot.params['id']; //capturing the listings id from the url endpoint
      this.listingService.getById(this.id).pipe(first()).subscribe(unit => this.listing = unit);
         
    }

    
}