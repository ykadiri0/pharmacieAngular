import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ville } from "./Ville";

@Injectable({
  providedIn: "root",
})
export class VilleService {
  constructor(private http: HttpClient) {}

  public getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`http://localhost:8081/getallville`);
  }

  public getVilleById(villeid: number): Observable<Ville> {
    return this.http.get<Ville>(`http://localhost:8081/getallville/${villeid}`);
  }

  public addVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(`http://localhost:8081/save`, ville);
  }

  public updateVille(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(`http://localhost:8081/update`, ville);
  }

  public deleteVille(villeid: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/delete/${villeid}`);
  }
}
