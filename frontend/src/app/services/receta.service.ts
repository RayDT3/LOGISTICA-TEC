import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Receta } from '../interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/receta/'
   }

   getListRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteReceta(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveReceta(receta: Receta): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,receta)
   }

   getReceta(id: number): Observable<Receta> {
     return this.http.get<Receta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateReceta(id: number, receta: Receta): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, receta);
   }
}
