import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FfxivApiService {
  constructor(private http: HttpClient) {}

  public allMounts(): Observable<any> {
    return this.http.get<any>('https://xivapi.com/Mount');
  }
}
