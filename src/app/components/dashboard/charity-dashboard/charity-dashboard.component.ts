import { Component } from '@angular/core';
import * as chartData from "../../../shared/data/dashboard/social";
import * as chartDataCM from '../../../shared/data/dashboard/ecommerce'

@Component({
  selector: 'app-charity-dashboard',
  templateUrl: './charity-dashboard.component.html',
  styleUrls: ['./charity-dashboard.component.scss']
})
export class CharityDashboardComponent {

  public views = chartData.views;
  public show: boolean = false;
  public monthlyProfits = chartDataCM.monthlyProfits;
  toggle() {
    this.show = !this.show;
  }
}
