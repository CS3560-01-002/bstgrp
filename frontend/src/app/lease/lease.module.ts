import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaseRoutingModule } from './lease-routing.module';
//import { ViewComponent } from './view/view.component';
//import ViewLeaseComponent
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ViewComponent } from './view/view.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [ ViewComponent, MakePaymentComponent, PaymentHistoryComponent, LayoutComponent],
  imports: [
    CommonModule,
    LeaseRoutingModule
  ]
})
export class LeaseModule { }
