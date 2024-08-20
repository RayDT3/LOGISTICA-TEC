
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediente } from '../interfaces/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/ingrediente/'; 
  }

  getListIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteIngrediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveIngrediente(ingrediente: Ingrediente): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, ingrediente);
  }

  getIngrediente(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateIngrediente(id: number, ingrediente: Ingrediente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, ingrediente);
  }
}
