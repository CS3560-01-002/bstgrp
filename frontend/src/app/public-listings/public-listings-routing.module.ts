import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicListingsComponent } from './public-listings.component';

const routes: Routes = [
    {
        path: '', component: PublicListingsComponent,
        // children: [
        //     { path: '', component: MaintenanceComponent }, //route to get all maintenance tickets
        //     { path: 'issues', component:  ViewMaintenanceComponent }
        //     //{ path: 'edit/:id', component: AddEditComponentListings }
        // ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicListingsRoutingModule { }
