import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ville } from "./Ville";
import { VilleService } from "./ville.service";
import { Zone } from "./zone";
import { ZoneService } from "./zone.service";

declare const google: any;
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit {
  zones: Zone[];

  zone: Zone;

  public villes: Ville[];

  constructor(
    private zoneService: ZoneService,
    private villeService: VilleService
  ) {}

  ngOnInit() {
    this.getZones();
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

  public getZones(): void {
    this.zoneService.getZones().subscribe(
      (response: Zone[]) => {
        this.zones = response;
        console.log(this.zones);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addZone(addForm: NgForm): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    console.log(addForm.value);
    this.zoneService.addZone(addForm.value).subscribe(
      (response: Zone) => {
        console.log(response);
        this.getZones();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateZone(zone: Zone): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.zoneService.updateZone(zone).subscribe(
      (response: Zone) => {
        console.log(response);
        this.getZones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteZone(id: number): void {
    //@ts-ignore
    document.getElementById("sed").click();
    this.zoneService.deleteZone(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getZones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(zone: Zone, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-bs-target", "#addZone");
    }
    if (mode === "edit") {
      this.zone = zone;
      console.log(this.zone);
      button.setAttribute("data-bs-target", "#updateZone");
    }
    if (mode === "delete") {
      this.zone = zone;
      button.setAttribute("data-bs-target", "#deleteZone");
    }
    container.appendChild(button);
    button.click();
  }
}
