import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
   }

   getListUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteUser(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   saveChef(User: Users): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,User)
   }

   getUser(id: number): Observable<Users> {
     return this.http.get<Users>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   updateUser(id: number, user: Users): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
   }

   signIn(user: Users): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }

   login(user: Users): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }
}
