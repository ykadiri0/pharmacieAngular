import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PhaGard } from "../notifications/phagard";
import { PharmacieService } from "./pharmacie.service";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  phags: PhaGard[];
  pha: PhaGard;

  constructor(private pharmacieService: PharmacieService) {}

  ngOnInit() {
    this.getPharmacies();
  }

  public getPharmacies(): void {
    this.pharmacieService.getPharmacies().subscribe(
      (response: PhaGard[]) => {
        this.phags = response;
        console.log(response);
        console.log(this.phags);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(zone: PhaGard, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "position") {
      this.pha = zone;
      var myLatlng = new google.maps.LatLng(
        this.pha.pharmacie[0].lat,
        this.pha.pharmacie[0].lon
      );
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
    container.appendChild(button);
    button.click();
  }
}
