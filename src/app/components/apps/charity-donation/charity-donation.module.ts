import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatorsComponent } from './donators/donators.component';
import { CharityDonationRoutingModule } from './charity-donation-routing.module';
import { ZakatComponent } from './zakat/zakat.component';



@NgModule({
  declarations: [
    DonatorsComponent,
    ZakatComponent
  ],
  imports: [
    CommonModule,
    CharityDonationRoutingModule
  ]
})
export class CharityDonationModule { }
