import { Component,OnInit } from '@angular/core';
import * as chartData from "../../../shared/data/dashboard/social";
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import * as chartDataCM from '../../../shared/data/dashboard/ecommerce';
import { Transaction } from 'src/app/shared/model/transaction.model';
import { Project } from 'src/app/shared/model/project.model';


@Component({
  selector: 'app-charity-dashboard',
  templateUrl: './charity-dashboard.component.html',
  styleUrls: ['./charity-dashboard.component.scss']
})
export class CharityDashboardComponent implements OnInit{

  public views = chartData.views;
  public show: boolean = false;
  public monthlyProfits = chartDataCM.monthlyProfits;
  transactions : Transaction[] = [];
  projects : Project[] = [];
  public totalDon :  number = 0;
  public totalZakat :  number = 0;
  public nbrService :  number = 0;
  public nbrIt :  number = 0;
  public nbrProd :  number = 0;
  public nbrConst :  number = 0;
  typeListChart = [ "service" , "it", "production" , "construction" ];
  tabNbrType : any[] = []; 
  constructor(private transactionService : TransactionService , private projectService : ProjectService){}

  
  toggle() {
    this.show = !this.show;
  }

  getTransaction() {
    this.transactionService.getAll().subscribe((data) => {
      console.log(data);
      this.transactions = data['data'];
      this.getTotal(this.transactions);
      console.log(this.transactions);
      // return data['data'];
    });
  }
  getProject() {
    this.projectService.getAll().subscribe((data) => {
      console.log(data);
      this.projects = data['data'];
      this.getNbrTypeChart(this.projects);
      // this.getTotal(this.projects);
      console.log(this.projects);
      // return data['data'];
    });
  }
  

  ngOnInit(): void{
    this.getTransaction();
    this.getProject();
  }
  getTotal(items){
    for (let item of items){
      if(item.type == "DON"){
        this.totalDon = this.totalDon + Number(item.amount);
      }else{
        this.totalZakat = this.totalZakat + Number(item.amount);
      }
      console.log(this.totalDon);
      console.log(this.totalZakat);
    }
   
    
  }

  getNbrTypeChart(items){
    for (let item of items){
      if(item.type == "service"){
        this.nbrService = this.nbrService +1;
      }else if(item.type == "it"){
        this.nbrIt = this.nbrIt +1;
      }else if(item.type == "production"){
        this.nbrProd = this.nbrProd +1;
      }else if(item.type == "construction"){
        this.nbrConst = this.nbrConst +1;
      }
    
    }

    this.tabNbrType = [this.nbrService, this.nbrIt,this.nbrProd,this.nbrConst];
  }

  
}
