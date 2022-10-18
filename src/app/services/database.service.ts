import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sentiment } from '../models/sentiment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private urlAPI: string = 'http://localhost:3000/faces';

  constructor(private http: HttpClient) { }

  public getSentiments(): Observable<Sentiment[]> {
    return this.http.get<Sentiment[]>(this.urlAPI);
  }
}
