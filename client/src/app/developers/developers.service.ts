import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developers } from '../models/developers';
import { Identifiers } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http:HttpClient) { }

  getDatas (): Observable<any> {
    const url = 'http://localhost:9000/developer';
    return this.http.get<any>(url);
  }
  addDev (data: Developers): Observable<any> {
    const url = 'http://localhost:9000/developer';
    return this.http.post<any>(url, data);
  }

  getDevsById (ID: Number): Observable<any> {
    const url = 'http://localhost:9000/developer/' + ID;
    return this.http.get(url);
  }

  updateDevsById (ID: Number, data: Developers): Observable<any> {
    const url = 'http://localhost:9000/developer/' + ID;
    return this.http.patch(url, data);
  }

  deleteDevById (ID: Number): Observable<any> {
    const url = 'http://localhost:9000/developer/' + ID;
    return this.http.delete(url);
  }
}
