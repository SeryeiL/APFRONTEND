import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  public skills: Skill[]=[];
  updateSkill: Skill | undefined;
  deleteSkills: Skill | undefined;
  isLogged: Boolean = false;

    constructor(private skillService:SkillService, private tokenService: TokenService) { }
  
    ngOnInit(): void {
      this.getSkills();
      if(this.tokenService.getToken()){
        this.isLogged = true;
      }

    }
  
    public getSkills():void{
      this.skillService.getSkill().subscribe({
       next:(Response: Skill[]) =>{
        this.skills=Response;
       },
       error:(error:HttpErrorResponse)=>{
        alert(error.message);
       }
      })
    }
  
    public onOpenModal(mode: String, skill?: Skill):void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.style.display = 'none';
      button.setAttribute('datas-bs-toggle','modal');
      if (mode === 'delete') {
        button.setAttribute('data-target', '#deleteSkillModal');
        this.deleteSkills = skill;
      } else if (mode === 'edit') {
        button.setAttribute('data-bs-target', '#editSkillModal');
        this.updateSkill = skill;
      }
      container?.appendChild(button);
      button.click();
    }
    
    public onAddSkill(addForm: NgForm): void {
      document.getElementById('addSkillModal')?.click();
      this.skillService.addSkill(addForm.value).subscribe({
        next: (response:Skill) => {
          this.getSkills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
        
    public onEditSkill(skill: Skill) {
      this.updateSkill = skill;
      document.getElementById('editSkillModal')?.click();
      this.skillService.updateSkill(skill).subscribe({
        next: (response: Skill) => {
          console.log(response);
          this.getSkills();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
    public onDeleteSkill(id:number) {
        this.skillService.deleteSkill(id).subscribe({
        next: (response: void) => {
         this.getSkills();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
    }
    
    
  