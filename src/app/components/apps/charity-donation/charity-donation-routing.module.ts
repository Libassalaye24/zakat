import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonatorsComponent } from './donators/donators.component';
import { ZakatComponent } from './zakat/zakat.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'dons',
      component: DonatorsComponent
    },
    {
      path: 'zakat',
      component: ZakatComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharityDonationRoutingModule { }
