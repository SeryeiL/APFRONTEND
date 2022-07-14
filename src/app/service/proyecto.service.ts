
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiServerUrl='https://datosback.herokuapp.com';

  constructor(private http:HttpClient) { }

  public getProyecto():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.apiServerUrl}/api/proyecto`); 
   }
 
   public addProyecto(proyecto:Proyecto):Observable<Proyecto>{
     return this.http.post<Proyecto>(`${this.apiServerUrl}/api/proyecto`, proyecto);
   }
 
   public updateProyecto(proyecto:Proyecto):Observable<Proyecto>{
     return this.http.put<Proyecto>(`${this.apiServerUrl}/api/proyecto`, proyecto);
   }
   public deleteProyecto(proyectoId:number):Observable<void>{
     return this.http.delete<void>(`${this.apiServerUrl}/api/proyecto/${proyectoId}`);
   }
 
 }
 
 