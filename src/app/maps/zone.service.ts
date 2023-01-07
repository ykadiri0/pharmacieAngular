import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Zone } from "./zone";

@Injectable({
  providedIn: "root",
})
export class ZoneService {
  constructor(private http: HttpClient) {}

  public getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`http://localhost:8081/getallzone`);
  }

  public addZone(ville: Zone): Observable<Zone> {
    return this.http.post<Zone>(`http://localhost:8081/savezone`, ville);
  }

  public updateZone(ville: Zone): Observable<Zone> {
    return this.http.put<Zone>(`http://localhost:8081/updatezone`, ville);
  }

  public deleteZone(villeid: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8081/deletezone/${villeid}`
    );
  }
}
