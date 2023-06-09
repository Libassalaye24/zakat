import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/model/project.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class ProjectService {
  url = environment.url;
  private api = `${this.url}/projects`;
  private headers : HttpHeaders;
  constructor(private http : HttpClient , private toastr : ToastrService) 
  {
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  }
  statusList = [{text:"En cours" , value: "PENDING"} , {text: "Validé" , value: "VALID"} , {text: "Non validé" , value: "INVALID"}];
  typeList = [{text: "service" , value: "service"} , {text:"it" , value: "it"} , {text:"production" , value:"production"} , {text:"construction" ,value:"construction"}];
  

  getAll(filters:any = ''): Observable<Project[]> {
    console.log(this.api);
  
    return this.http.get<Project[]>(`${this.api}${filters}` , { headers : this.headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    )
  }
  delete(id:string): Observable<Project>{

    return this.http.delete(`${this.api}/${id}`, {headers : this.headers} ).pipe(
      catchError((error) => {
        console.log("error serveur!! "+JSON.stringify(error));
        this.toastr.error("Suppression : Une erreur est survenue.");
        return throwError(error);
      })
    )
  }
  changeStatus(id:string , status:string): Observable<Project>{

    return this.http.put(`${this.api}/${id}` , {status : status}, {headers : this.headers} ).pipe(
      catchError((error) => {
        console.log("error serveur!! "+JSON.stringify(error.error));
        this.toastr.error(`Erreur : ${error.error.data ?? 'une erreur est survenue'}.`);
        return throwError(error);
      })
    )
  }
  getByType(type:any): Observable<Project[]> {
    console.log(this.api);
    return this.http.get<Project[]>(`${this.api}?type=${type}` , { headers : this.headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    );
  }

  getByStatus(status:any){
    console.log(this.api);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Project[]>(`${this.api}?status=${status}` , { headers }).pipe(
      catchError((error) => {
        console.log("error serveur!!");
        this.toastr.error("Une erreur est survenue.");
        return throwError(error);
      })
    );
  }

}
