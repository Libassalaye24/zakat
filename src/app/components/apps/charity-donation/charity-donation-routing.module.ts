import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonatorsComponent } from './donators/donators.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'donators',
      component: DonatorsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharityDonationRoutingModule { }
