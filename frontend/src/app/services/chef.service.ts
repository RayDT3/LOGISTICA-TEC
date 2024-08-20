import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Chef } from '../interfaces/chef';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/chef/'
  }

  getListChefs(): Observable<Chef[]> {
   return this.http.get<Chef[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteChef(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveChef(chef: Chef): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,chef)
  }

  getChef(id: number): Observable<Chef> {
    return this.http.get<Chef>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateChef(id: number, chef: Chef): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, chef);
  }

}
