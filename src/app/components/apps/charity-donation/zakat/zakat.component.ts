import { Component,OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Transaction } from 'src/app/shared/model/transaction.model';
// import { IziToastService } from 'ngx-izitoast';
import { Observable, of } from 'rxjs';
import iziToast from 'izitoast';
import { SwalService } from 'src/app/shared/services/swal.service';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-zakat',
  templateUrl: './zakat.component.html',
  styleUrls: ['./zakat.component.scss']
})
export class ZakatComponent implements OnInit {

  transactions : Transaction[] = [];
  transactionFilters : Transaction[] = [];
  statusList : any[] = [];
  type : string = "ZAKAT";
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

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term === '' ? []
  //       : this.transactions.filter(item => item.reference.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   );
  
 

  contains(value: string, term: string): boolean {
    return value.includes(term);
  }
  ngOnInit(){
    this.getDataByType(this.type);
  }

}
