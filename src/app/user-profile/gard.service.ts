import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gard } from "./gard";

@Injectable({
  providedIn: "root",
})
export class GardService {
  constructor(private http: HttpClient) {}

  public getGards(): Observable<Gard[]> {
    return this.http.get<Gard[]>(`http://localhost:8081/getallgard`);
  }

  public addGard(ville: Gard): Observable<Gard> {
    return this.http.post<Gard>(`http://localhost:8081/savegard`, ville);
  }

  public updateGard(ville: Gard): Observable<Gard> {
    return this.http.put<Gard>(`http://localhost:8081/updategard`, ville);
  }

  public deleteGard(villeid: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8081/deletegard/${villeid}`
    );
  }
}
