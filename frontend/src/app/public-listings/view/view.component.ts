import { Component, OnInit } from '@angular/core';
import { Unit } from '@app/_models/unit';
import { ListingService } from '@app/_services/listing.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less'],
})
export class ViewComponent implements OnInit {
  listing: Unit;
  unit = null;
  accountType: string;
  adminAccess: boolean;
  id: string;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //capturing the listings id from the url endpoint
    this.listingService
      .getByPublicId(this.id)
      .pipe(first())
      .subscribe((unit) => (this.listing = unit));
  }
}
