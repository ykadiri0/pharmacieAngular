import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pharmacie } from "./pharmacie";
import { PhaGard } from "./phagard";

@Injectable({
  providedIn: "root",
})
export class PharmacieService {
  constructor(private http: HttpClient) {}

  public getPharmacies(): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(`http://localhost:8081/getallphar`);
  }

  public addPharmacie(ville: Pharmacie): Observable<Pharmacie> {
    return this.http.post<Pharmacie>(`http://localhost:8081/savephar`, ville);
  }

  public updatePharmacie(ville: Pharmacie): Observable<Pharmacie> {
    return this.http.put<Pharmacie>(`http://localhost:8081/updatephar`, ville);
  }

  public deletePharmacie(villeid: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8081/deletephar/${villeid}`
    );
  }
  public etatp(pha: Pharmacie): Observable<Pharmacie> {
    return this.http.put<Pharmacie>(`http://localhost:8081/etatp`, pha);
  }
  public etatn(pha: Pharmacie): Observable<Pharmacie> {
    return this.http.put<Pharmacie>(`http://localhost:8081/etatn`, pha);
  }

  public getGards(villeid: number): Observable<PhaGard[]> {
    return this.http.get<PhaGard[]>(
      `http://localhost:8081/getallp?id=${villeid}`
    );
  }
}
