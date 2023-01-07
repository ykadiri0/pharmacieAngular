import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PhaGard } from "../notifications/phagard";

@Injectable({
  providedIn: "root",
})
export class PharmacieService {
  constructor(private http: HttpClient) {}

  public getPharmacies(): Observable<PhaGard[]> {
    return this.http.get<PhaGard[]>(`http://localhost:8081/getty`);
  }
}
