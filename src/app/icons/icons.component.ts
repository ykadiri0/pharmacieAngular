import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ville } from "./Ville";
import { VilleService } from "./ville.service";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.css"],
})
export class IconsComponent implements OnInit {
  public villes: Ville[];

  public ville: Ville;

  constructor(private villeService: VilleService) {}

  ngOnInit() {
    this.getVilles();
  }

  public getVilles(): void {
    this.villeService.getVilles().subscribe(
      (response: Ville[]) => {
        this.villes = response;
        console.log(this.villes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addVille(addForm: NgForm): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.villeService.addVille(addForm.value).subscribe(
      (response: Ville) => {
        console.log(response);
        this.getVilles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateVille(addForm1: NgForm): void {
    console.log(addForm1.value);
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.villeService.addVille(addForm1.value).subscribe(
      (response: Ville) => {
        console.log(response);
        this.getVilles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteVille(id: number): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.villeService.deleteVille(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getVilles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(ville: Ville, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-bs-target", "#addVille");
    }
    if (mode === "edit") {
      this.ville = ville;
      button.setAttribute("data-bs-target", "#updateVille");
    }
    if (mode === "delete") {
      this.ville = ville;
      button.setAttribute("data-bs-target", "#deleteVille");
    }
    container.appendChild(button);
    button.click();
  }
}
