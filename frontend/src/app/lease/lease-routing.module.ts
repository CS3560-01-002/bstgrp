import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseComponent } from './lease.component';
const routes: Routes = [
    {
        path: '', component: LeaseComponent,
        // children: [
        //     { path: '', component: LeaseComponent },
        //     { path: 'add', component: AddEditComponentListings },
        //     { path: 'edit/:id', component: AddEditComponentListings },
        //     { path: 'view/:id', component: ViewComponent }
        // ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { 
  
}

