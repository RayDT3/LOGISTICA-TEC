import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Almacen } from '../interfaces/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/almacenes/'
   }

   getListAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteAlmacen(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveAlmacen(almacen: Almacen): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,almacen)
   }

   getAlmacen(id: number): Observable<Almacen> {
     return this.http.get<Almacen>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateAlmacen(id: number, almacen: Almacen): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, almacen);
   }
}

