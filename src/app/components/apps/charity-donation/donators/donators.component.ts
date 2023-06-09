import { Component,OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Transaction } from 'src/app/shared/model/transaction.model';
// import { IziToastService } from 'ngx-izitoast';
import iziToast from 'izitoast';
import { SwalService } from 'src/app/shared/services/swal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-donators',
  templateUrl: './donators.component.html',
  styleUrls: ['./donators.component.scss']
})
export class DonatorsComponent {

  
  transactions : Transaction[] = [];
  transactionFilters : Transaction[] = [];
  statusList : any[] = [];
  type : string = "DON";
  constructor(private transactionService : TransactionService , private swalService: SwalService){}

  getDataByType(type:string) {
    this.transactionService.getByType(type).subscribe((data) => {
      console.log(data);
      this.transactions = data['data'];
      this.transactionFilters = this.transactions;
      console.log(this.transactions);
      // return data['data'];
    });
  }
  filterListByRef(event: any) {
    this.transactionFilters = this.transactionService.filterListByRef(event.target.value , this.transactionFilters , this.transactions);
  }
  ngOnInit(){
    this.getDataByType(this.type);
  }
}
