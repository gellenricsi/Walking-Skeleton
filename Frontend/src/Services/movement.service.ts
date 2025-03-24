import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement, MovementCreateRequest } from '../Interfaces/movement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private apiUrl = `http://localhost:8080/movement`;

  constructor(private http: HttpClient) {}

  createMovement(movement: MovementCreateRequest): Observable<any> {
    return this.http.post<Movement>(this.apiUrl, movement);
  }
}
