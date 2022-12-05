import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicListingsRoutingModule } from './public-listings-routing.module';
import { ViewComponent } from './view/view.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [ViewComponent, LayoutComponent],
  imports: [
    CommonModule,
    PublicListingsRoutingModule
  ]
})
export class PublicListingsModule { }
