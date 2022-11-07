import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListingComponent } from './listing.component';
import { AddEditComponentListings } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListingComponent },
            { path: 'add', component: AddEditComponentListings },
            { path: 'edit/:id', component: AddEditComponentListings }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListingRoutingModule { }

//the way routing is handled right now is the main routing component, app-routing.module.ts, is used to route
//between the main page and the component pages (here components are being referred to the ones created using CLI)
//the routing module found within the components helps handle the routing between the different html pages
//created within the component, refer to the Users component for example, where there are several html pages
//and the routing between these pages is handled via the users-routing.module.ts file