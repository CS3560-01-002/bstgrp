import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { PublicListingsComponent } from './public-listings.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from '../account/register.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PublicListingsComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: '../account/register', component: RegisterComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicListingsRoutingModule {}
