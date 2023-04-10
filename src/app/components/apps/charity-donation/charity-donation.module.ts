import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatorsComponent } from './donators/donators.component';
import { CharityDonationRoutingModule } from './charity-donation-routing.module';



@NgModule({
  declarations: [
    DonatorsComponent
  ],
  imports: [
    CommonModule,
    CharityDonationRoutingModule
  ]
})
export class CharityDonationModule { }
