import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    // Make the HTTP request to the backend API
    // Replace 'API_URL' with the actual URL of your backend API endpoint
    var data = { UsernameOrEmail: email, Password: password };
    return this.http.post<any>('http://localhost:5109/api/user/login', data);
  }

  handleLoginResponse(response: any): void {
    // Check the response from the backend API
    if (response.errors) {
      // Login failed
      // Display error messages or perform any other actions
      console.log(response.errors.UsernameOrEmail[0]);
      
    } else {
      // Login successful
      // Store the authentication token or perform any other actions
      localStorage.setItem('token', response.token);

      // Fetch the user based on the token
      this.getUserByToken().subscribe(
        (user: any) => {
          // Store the logged-in user in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        })
    
      // Navigate the user to the "To do" screen using Angular's routing
      this.router.navigate(['/todo']);
    }
  }

  getUserByToken(): Observable<any> {
    // Get the authentication token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Make a GET request to the backend API to retrieve the user based on the token
    return this.http.get<any>(`http://localhost:5109/api/user/token`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }
}
