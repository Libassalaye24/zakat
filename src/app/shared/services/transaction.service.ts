import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from 'src/app/shared/model/transaction.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class TransactionService {
  url = environment.url;
  private api = `${this.url}/transactions`;
  private headers : HttpHeaders;
  
  constructor(private http : HttpClient , private toastr : ToastrService) 
  {
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  }
  statusList = [{text:"En attente" , value: "PENDING"} , {text: "Validé" , value: "VALID"} , {text: "Annulé" , value: "CANCELED"}];

  getAll(): Observable<Transaction[]> {

    return this.http.get<Transaction[]>(this.api , { headers : this.headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    )
  }

  delete(id:string): Observable<Transaction>{

    return this.http.delete(`${this.api}/${id}`, {headers : this.headers} ).pipe(
      catchError((error) => {
        console.log("error serveur!! "+JSON.stringify(error));
        this.toastr.error("Suppression : Une erreur est survenue.");
        return throwError(error);
      })
    )
  }
  
  getByType(type:string): Observable<Transaction[]> {
    console.log(this.api);
    return this.http.get<Transaction[]>(`${this.api}?type=${type}` , { headers : this.headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    );
  }

  filterListByRef(ref:string , filterTab:Transaction[] , defaultType:Transaction[]):Transaction[] {
    
    console.log("ref "+ref);
    if(ref !== ""){
      console.log("ref not emp "+ref);
      // this.transactions = this.transactions.filter(item => this.contains(item.reference , ref));
      filterTab = defaultType.filter(item => item.reference.toLowerCase().includes(ref.toLowerCase()));
    }else{
      console.log("ref emp"+ref);
     filterTab = defaultType;
    }
    return filterTab;
  }
//   getByStatus(status:any){

//     return this.http.get<Transaction[]>(`${this.api}?status=${status}` , { headers : this.headers }).pipe(
//       catchError((error) => {
//         console.log("error serveur!!");
//         this.toastr.error("Une erreur est survenue.");
//         return throwError(error);
//       })
//     );
//   }

}
