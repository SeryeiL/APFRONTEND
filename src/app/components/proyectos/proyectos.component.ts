import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyecto[] = [];
  updateProyecto: Proyecto | undefined;
  deleteProyecto: Proyecto | undefined;
  isLogged: Boolean = false;


  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getProyectos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  public getProyectos(): void {
    this.proyectoService.getProyecto().subscribe({
      next: (Response: Proyecto[]) => {
        this.proyectos = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(mode: String, proyecto?: Proyecto):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('datas-bs-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProyectoModal');
    } else if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteProyectoModal');
      this.deleteProyecto = proyecto;
    } else if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#editProyectoModal');
      this.updateProyecto = proyecto;
    }
    container?.appendChild(button);
    button.click();
  }
  
  public onAddProyecto(addForm: NgForm): void {
    document.getElementById('addProyectoModal')?.click();
    this.proyectoService.addProyecto(addForm.value).subscribe({
      next: (response:Proyecto) => {
        this.getProyectos();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }
  
  
  public onEditProyecto(proyecto: Proyecto) {
    this.updateProyecto = proyecto;
    document.getElementById('editProyectoModal')?.click();
    this.proyectoService.updateProyecto(proyecto).subscribe({
      next: (response: Proyecto) => {
        console.log(response);
        this.getProyectos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public onDeleteProyecto(id:number) {
      this.proyectoService.deleteProyecto(id).subscribe({
      next: (response: void) => {
       this.getProyectos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  }
  


