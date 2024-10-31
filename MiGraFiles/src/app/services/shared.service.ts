import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedDoc} from '../entities/shared-doc';
import {Observable} from 'rxjs';
import {Links} from '../shared/links';
import {Doc} from '../entities/doc';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  public getSharedDocs(shareholder: string) : Observable<SharedDoc[]>{
    return this.http.get<SharedDoc[]>(Links.API_URL+"shared?shareholder="+shareholder);
  }

  public pushSharedDoc(doc : SharedDoc):Observable<string>{
    return this.http.post<string>(Links.API_URL+"shared",doc);
  }

  public checkUser(shareholder:string): Observable<string>{
    return this.http.get<string>(Links.API_URL+"login?shareholder="+shareholder)
  }
}
