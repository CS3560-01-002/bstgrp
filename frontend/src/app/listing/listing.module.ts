import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ListingRoutingModule } from './listing-routing.module';
//import { LayoutComponent } from './layout.component';
import { ListingComponent } from './listing.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
//import { AddEditListingComponent } from './add-edit-listing.component';
import { AddEditComponentListings } from '@app/listing/add-edit.component';
import { ViewComponent } from './view/view.component';
import {FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
  ListingComponent,
  LayoutComponent,
    //AddEditListingComponent,
  AddEditComponentListings,
    ViewComponent,
    FilterPipe,
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListingRoutingModule,
    //LayoutComponent,
    FormsModule,
  ]
})
export class ListingModule { }
