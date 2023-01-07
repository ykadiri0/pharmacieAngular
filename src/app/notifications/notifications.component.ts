import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PhaGard } from "./phagard";
import { Pharmacie } from "./pharmacie";
import { PharmacieService } from "./pharmacie.service";
import { GoogleMapsModule } from "@angular/google-maps";
declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  phas: Pharmacie[];
  pha: Pharmacie;
  phagards: PhaGard[];

  constructor(private pharmacieService: PharmacieService) {}

  ngOnInit() {
    this.getPharmacies();
  }

  public getPharmacies(): void {
    this.pharmacieService.getPharmacies().subscribe(
      (response: Pharmacie[]) => {
        this.phas = response;
        console.log(this.phas);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public etatpositif(zone: Pharmacie): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.pharmacieService.etatp(zone).subscribe(
      (response: Pharmacie) => {
        console.log(response);
        this.getPharmacies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public etatnegatif(zone: Pharmacie): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.pharmacieService.etatn(zone).subscribe(
      (response: Pharmacie) => {
        console.log(response);
        this.getPharmacies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public historique(zone: Pharmacie): void {
    //@ts-ignore
    document.getElementById("add-employee-form").click();
    this.pharmacieService.getGards(zone.id).subscribe(
      (response: PhaGard[]) => {
        this.phagards = response;
        console.log(response);
        this.getPharmacies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(zone: Pharmacie, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "position") {
      this.pha = zone;
      var myLatlng = new google.maps.LatLng(this.pha.lat, this.pha.lon);
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            featureType: "water",
            stylers: [
              {
                saturation: 43,
              },
              {
                lightness: -11,
              },
              {
                hue: "#0088ff",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                hue: "#ff0000",
              },
              {
                saturation: -100,
              },
              {
                lightness: 99,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#808080",
              },
              {
                lightness: 54,
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ece2d9",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ccdca1",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#767676",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#b8cb93",
              },
            ],
          },
          {
            featureType: "poi.park",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi.sports_complex",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
        ],
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!",
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
      button.setAttribute("data-bs-target", "#pospha");
    }

    if (mode === "etatp") {
      this.pha = zone;
      button.setAttribute("data-bs-target", "#etatp");
    }

    if (mode === "etatn") {
      this.pha = zone;
      button.setAttribute("data-bs-target", "#etatn");
    }
    if (mode === "hist") {
      button.setAttribute("data-bs-target", "#hist");
      this.historique(this.pha);
    }
    container.appendChild(button);
    button.click();
  }
}
