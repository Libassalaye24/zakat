import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { PaiementRoutingModule } from './paiement-routing.module';



@NgModule({
  declarations: [
    PaymentTypeComponent
  ],
  imports: [
    CommonModule,
    PaiementRoutingModule
  ]
})
export class PaiementModule { }
