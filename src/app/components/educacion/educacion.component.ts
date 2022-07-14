import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones: Educacion[]=[];
  updateEducacion: Educacion | undefined;
  deleteEducacion: Educacion | undefined;
  isLogged: Boolean = false;

  constructor(private educacionService:EducacionService, private tokenService: TokenService) { }

  ngOnInit(): void {
   this.getEducaciones();
   if(this.tokenService.getToken()){
    this.isLogged = true;
  }
  }

  public getEducaciones():void{
    this.educacionService.getEducacion().subscribe({
     next:(Response: Educacion[]) =>{
      this.educaciones=Response;
     },
     error:(error:HttpErrorResponse)=>{
      alert(error.message);
     }
    })
  }

  
public onOpenModal(mode: String, educacion?: Educacion):void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.style.display = 'none';
  button.setAttribute('datas-bs-toggle','modal');
  if (mode === 'add') {
    button.setAttribute('data-bs-target', '#addEducacionModal');
  } else if (mode === 'delete') {
    button.setAttribute('data-target', '#deleteEducacionModal');
    this.deleteEducacion = educacion;
  } else if (mode === 'edit') {
    button.setAttribute('data-bs-target', '#editEducacionModal');
    this.updateEducacion = educacion;
  }
  container?.appendChild(button);
  button.click();
}

public onAddEducacion(addForm: NgForm): void {
  document.getElementById('addEducacionModal')?.click();
  this.educacionService.addEducacion(addForm.value).subscribe({
    next: (response:Educacion) => {
      this.getEducaciones();
      addForm.reset();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
    }
  })
}


public onEditEducacion(educacion: Educacion) {
  this.updateEducacion = educacion;
  document.getElementById('editEducacionModal')?.click();
  this.educacionService.updateEducacion(educacion).subscribe({
    next: (response: Educacion) => {
      console.log(response);
      this.getEducaciones();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}
public onDeleteEducacion(id:number) {
    this.educacionService.deleteEducacion(id).subscribe({
    next: (response: void) => {
     this.getEducaciones();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}
}




