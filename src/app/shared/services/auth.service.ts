import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class AuthService {

  url = environment.url;
  private api = `${this.url}/users`;
  private token : string|null;
  constructor( private http : HttpClient) { }


  login(phone : string , password : string){
    return this.http.post<any>(`${this.api}/auth` , {phone , password})
      .toPromise()
      .then((response) => {
        this.token = response.data.token;
        localStorage.setItem("user" , JSON.stringify(response.data.user));
        localStorage.setItem("token" , response.data.token);
        return response;
      });
  }

  logOut() {  
    this.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  // logout() {
  //   // supprimer le jeton et la date d'expiration du stockage local
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('expires_at');
  // }

  // isLoggedIn() {
  //   // vérifier si le jeton a expiré
  //   const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
  //   return Date.now() < expiresAt;
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }


  getToken(): string {
    return localStorage.getItem("token");
  }
}
