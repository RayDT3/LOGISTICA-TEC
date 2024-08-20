import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleReceta } from '../interfaces/detalleReceta';

@Injectable({
  providedIn: 'root'
})
export class DetalleRecetaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/detalleReceta/'
   }

   getListDetalleRecetas(): Observable<DetalleReceta[]> {
    return this.http.get<DetalleReceta[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteDetalleReceta(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveDetalleReceta(detalleReceta: DetalleReceta): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,detalleReceta)
   }

   getDetalleReceta(id: number): Observable<DetalleReceta> {
     return this.http.get<DetalleReceta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateDetalleReceta(id: number, detalleReceta: DetalleReceta): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, detalleReceta);
   }
}
