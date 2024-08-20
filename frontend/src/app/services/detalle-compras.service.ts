import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleCompras } from '../interfaces/detalleCompras';

@Injectable({
  providedIn: 'root'
})
export class DetalleComprasService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/detalleCompras/'
  }

  getListDetalleCompras(): Observable<DetalleCompras[]> {
    return this.http.get<DetalleCompras[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteDetalleCompra(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveDetalleCompra(detalleCompras: DetalleCompras): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,detalleCompras)
   }

   getDetalleCompra(id: number): Observable<DetalleCompras> {
     return this.http.get<DetalleCompras>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateDetalleCompra(id: number, detalleCompra: DetalleCompras): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, detalleCompra);
   }
}
