import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string='http://localhost:3000';
  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<any> {
  const loginUrl = `${this.baseUrl}/users`;
  return this.http.get<any[]>(loginUrl).pipe(
    map(users => {
      const foundUser = users.find(user => user.email === email);
      if (foundUser) {
        if (foundUser.password === password) {
          return { success: true }; // Login successful
        } else {
          return { success: false, error: 'Incorrect password.' };
        }
      } else {
        return { success: false, error: "Sorry, we can't find an account with this email address." };
      }
    }),
    catchError(() => of({ success: false, error: 'Server error' }))
  );
}

  

}
