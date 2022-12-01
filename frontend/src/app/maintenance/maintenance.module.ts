import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { ViewMaintenanceComponent } from './view/view.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [ViewMaintenanceComponent, LayoutComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
