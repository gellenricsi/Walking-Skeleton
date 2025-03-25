import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement, MovementCreateRequest } from '../Interfaces/movement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  public apiUrl = `http://localhost:8080/movement`; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // Sends a POST request to create a new movement entry.
  createMovement(movement: MovementCreateRequest): Observable<any> {
    return this.http.post<Movement>(this.apiUrl, movement);
  }
}
