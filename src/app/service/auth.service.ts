import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'https://datosback.herokuapp.com/api/login';

  constructor(private httpClient: HttpClient) { }

  public login(loginsuario: LoginUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL, loginsuario);
  }
}
