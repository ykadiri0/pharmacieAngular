import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class DashbordService {
  public port = "8081";
  public ip = "localhost";

  constructor(private http: HttpClient) {}

  public getuser(): Observable<Object> {
    return this.http.get<Object>(
      `http://` + this.ip + `:` + this.port + `/getallstats`
    );
  }

  public getstats(): Observable<Object> {
    return this.http.get<Object>(
      `http://` + this.ip + `:` + this.port + `/getallstats2`
    );
  }
}
