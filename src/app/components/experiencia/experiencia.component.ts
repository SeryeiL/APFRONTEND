import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  public experiencias: Experiencia[]=[];
  updateExperiencia: Experiencia | undefined;
  deleteExperiencia: Experiencia | undefined;
  isLogged: Boolean = false;
  
    constructor(private experienciaService:ExperienciaService, private tokenService: TokenService) { }
  
    ngOnInit(): void {
      this.getExperiencias();
      if(this.tokenService.getToken()){
        this.isLogged = true;
      }
    }

    public getExperiencias():void{
      this.experienciaService.getExperiencia().subscribe({
       next:(Response: Experiencia[]) =>{
        this.experiencias=Response;
       },
       error:(error:HttpErrorResponse)=>{
        alert(error.message);
       }
      })
    }
  
 
  
  public onOpenModal(mode: String, experiencia?: Experiencia):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('datas-bs-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addExperienciaModal');
    } else if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteExperienciaModal');
      this.deleteExperiencia = experiencia;
    } else if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#editExperienciaModal');
      this.updateExperiencia = experiencia;
    }
    container?.appendChild(button);
    button.click();
  }
  
  public onAddExperiencia(addForm: NgForm): void {
    document.getElementById('addExperienciaModal')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response:Experiencia) => {
        this.getExperiencias();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }
  
  
  public onEditExperiencia(experiencia: Experiencia) {
    this.updateExperiencia = experiencia;
    document.getElementById('editExperienciaModal')?.click();
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencias();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public onDeleteExperiencia(id:number) {
      this.experienciaService.deleteExperiencia(id).subscribe({
      next: (response: void) => {
       this.getExperiencias();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  }
  

  
