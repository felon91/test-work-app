import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/internal/Observable";
import {Post} from './interfaces';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Post> {
    return this.http.get<Post>(`${environment.dataUrl}/list.json`);
  }

  getById(url: string): Observable<Post> {
    return this.http.get<Post>(`${environment.dataUrl}${url}`);
  }
}
