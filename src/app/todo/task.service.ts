import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5109/api/tasks'; // Replace with your backend API URL
  private loggedInUser: any; // Replace 'any' with the type/interface of your user object

  constructor(private http: HttpClient) { 
     // Initialize or retrieve the logged-in user from storage, e.g., local storage or session storage
     this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  // Fetches all tasks from the backend API
  getTasks(): Observable<Task[]> {
    // Get the authentication token from local storage or wherever it's stored
    const token: string | null = localStorage.getItem('token');

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    // Make the HTTP request with the headers
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  // Creates a new task by sending a POST request to the backend API
  createTask(task: Task): Observable<Task> {
    // Get the authentication token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  // Updates an existing task by sending a PUT request to the backend API
  updateTask(task: Task): Observable<void> {
    // Get the authentication token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<void>(url, task, { headers });
  }

  // Deletes a task by sending a DELETE request to the backend API
  deleteTask(taskId: number): Observable<void> {
    // Get the authentication token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url, { headers });
  }

}
