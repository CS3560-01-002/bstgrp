import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseComponent } from './lease.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ViewComponent } from './view/view.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: LeaseComponent }, //will contain the buttons routing to the other pages as well as from the navbar
            { path: 'pay', component: MakePaymentComponent },
            { path: 'history', component: PaymentHistoryComponent },
            { path: 'view/:id', component: ViewComponent } //the username/user_id will be passed here to retrieve the associated lease/financial info
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { 
  
}

