import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
public usuario: Usuario | undefined;
public editUsuario: Usuario | undefined;
isLogged: Boolean = false;

  constructor(private personaService: PersonaService, private tokenService: TokenService ) { }

  ngOnInit(): void {
    this.getUser();
    if(this.tokenService.getToken()){
    this.isLogged = true;
    }
 }

 public getUser(): void{
  this.personaService.getUser().subscribe({
   next: (response:Usuario)=>{
    this.usuario=response;
   },
   error:(error:HttpErrorResponse) =>{
    alert(error.message);
   }
  })
 }

 public onOpenModal(mode: String, usuario?: Usuario):void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.style.display = 'none';
  button.setAttribute('datas-bs-toggle','modal');
   if (mode === 'edit') {
    button.setAttribute('data-bs-target', '#editUsuarioModal');
    this.editUsuario = usuario;
  }
  container?.appendChild(button);
  button.click();
}

public onEditUsuario(usuario: Usuario) {
  this.editUsuario = usuario;
  document.getElementById('editUsuarioModal')?.click();
  this.personaService.editUsuario(usuario).subscribe({
    next: (response: Usuario) => {
      console.log(response);
      this.getUser();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}


}
