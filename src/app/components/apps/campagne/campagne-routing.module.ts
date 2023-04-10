import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampagneListComponent } from './campagne-list/campagne-list.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'list',
      component: CampagneListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampagneRoutingModule { }
