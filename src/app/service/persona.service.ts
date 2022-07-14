
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private apiServerUrl='https://datosback.herokuapp.com';

  constructor(private http:HttpClient) { }
public getUser():Observable<Usuario>{
  return this.http.get<Usuario>(`${this.apiServerUrl}/api/usuario/id/1`);
}

public editUsuario(usuario:Usuario):Observable<Usuario>{
return this.http.put<Usuario>(`${this.apiServerUrl}/api/usuario`,usuario);
}
 
}