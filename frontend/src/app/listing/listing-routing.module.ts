import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingComponent } from './listing.component';

const routes: Routes = [{
  path: '', component: ListingComponent,
  children: [
      { path: '', component: ListingComponent }
     // { path: 'add', component: AddEditComponent }, enable later after getting main page to load
     // { path: 'edit/:id', component: AddEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { }


