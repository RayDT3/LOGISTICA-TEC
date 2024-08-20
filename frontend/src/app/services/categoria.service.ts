import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categoria/'
   }

   getListCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteCategoria(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveCategoria(categoria: Categoria): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,categoria)
   }

   getCategoria(id: number): Observable<Categoria> {
     return this.http.get<Categoria>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateCategoria(id: number, categoria: Categoria): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, categoria);
   }
}
