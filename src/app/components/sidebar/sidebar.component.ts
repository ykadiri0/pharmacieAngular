import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "design_app", class: "" },
  { path: "/icons", title: "Villes", icon: "education_atom", class: "" },
  { path: "/maps", title: "Zone", icon: "location_map-big", class: "" },
  {
    path: "/notifications",
    title: "Pharmacies",
    icon: "ui-1_bell-53",
    class: "",
  },
  {
    path: "/table-list",
    title: "Pharmacies en garde",
    icon: "design_bullet-list-67",
    class: "",
  },

  {
    path: "/user-profile",
    title: "Gardes",
    icon: "users_single-02",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
