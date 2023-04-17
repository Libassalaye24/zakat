import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/shared/model/contact.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class ContactService {
  url = environment.url;
  private api = `${this.url}/contact`;
  private headers : HttpHeaders;
  constructor(private http : HttpClient , private toastr : ToastrService) 
  {
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  }
 
  getAll(): Observable<Contact[]> {
    console.log(this.api);
   
    return this.http.get<Contact[]>(this.api , { headers : this.headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    )
  }

  delete(id:string): Observable<Contact>{

    return this.http.delete(`${this.api}/${id}`, {headers : this.headers} ).pipe(
      catchError((error) => {
        console.log("error serveur!! "+JSON.stringify(error));
        this.toastr.error("Suppression : Une erreur est survenue.");
        return throwError(error);
      })
    )
  }

}
