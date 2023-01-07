import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gard } from './gard';
import { GardService } from './gard.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public gards: Gard[];

  public gard: Gard;

  constructor(private gardService: GardService) { }

  ngOnInit() {
    this.getGards();
  }

  public getGards(): void {
    this.gardService.getGards().subscribe(
      (response: Gard[]) => {
        this.gards = response;
        console.log(this.gards);


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public addGard(addForm: NgForm): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.gardService.addGard(addForm.value).subscribe(
      (response: Gard) => {
        console.log(response);
        this.getGards();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public updateGard(addForm: NgForm): void {
    //@ts-ignore
    document.getElementById("close").click();
    this.gardService.updateGard(addForm.value).subscribe(
      (response: Gard) => {
        console.log(response);
        this.getGards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteGard(id: number): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.gardService.deleteGard(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getGards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(ville: Gard, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addVille');
    }
    if (mode === 'edit') {
      this.gard = ville;
      button.setAttribute('data-bs-target', '#updateVille');
    }
    if (mode === 'delete') {
      this.gard = ville;
      button.setAttribute('data-bs-target', '#deleteVille');
    }
    container.appendChild(button);
    button.click();
  }

}
