import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../interfaces/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pedido/';
  }

  getListPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  savePedido(pedido: Pedido): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, pedido);
  }

  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updatePedido(id: number, pedido: Pedido): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, pedido);
  }

  getIngredientesByPedido(idPedido: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}/pedidos/${idPedido}/ingredientes`);
  }
}
