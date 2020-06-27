import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Games } from '../models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private http:HttpClient) { }

  getGames (): Observable<any> {
    const url = 'http://localhost:9000/game';

    return this.http.get<any>(url);
  }

  getGameById (ID: Number): Observable<any> {
    const url = 'http://localhost:9000/game/' + ID;

    return this.http.get(url);
  }

  addGames (data: Games): Observable<any> {
    const url = 'http://localhost:9000/game';

    return this.http.post<any>(url, data);
  }

  deleteGame (ID: Number): Observable<any> {
    const url = 'http://localhost:9000/game/' + ID;

    return this.http.delete<any>(url);
  }

  updateGameById (ID: Number, data: Games): Observable<any> {
    const url = 'http://localhost:9000/game/' + ID;

    return this.http.patch(url, data);
  }
}
