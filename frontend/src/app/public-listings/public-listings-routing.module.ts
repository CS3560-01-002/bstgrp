import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { PublicListingsComponent } from './public-listings.component';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PublicListingsComponent },
      { path: 'view/:id', component: ViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicListingsRoutingModule {}
