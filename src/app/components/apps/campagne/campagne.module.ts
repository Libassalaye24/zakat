import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampagneListComponent } from './campagne-list/campagne-list.component';
import { CampagneRoutingModule } from './campagne-routing.module';
// import { BookmarksRoutingModule } from './bookmarks-routing.module';



@NgModule({
  declarations: [
    CampagneListComponent
  ],
  imports: [
    CommonModule,
    CampagneRoutingModule
  ]
})
export class CampagneModule { }
