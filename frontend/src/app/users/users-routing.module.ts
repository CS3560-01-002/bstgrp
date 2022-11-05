import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

//the way routing is handled right now is the main routing component, app-routing.module.ts, is used to route
//between the main page and the component pages (here components are being referred to the ones created using CLI)
//the routing module found within the components helps handle the routing between the different html pages
//created within the component, refer to the Users component for example, where there are several html pages
//and the routing between these pages is handled via the users-routing.module.ts file