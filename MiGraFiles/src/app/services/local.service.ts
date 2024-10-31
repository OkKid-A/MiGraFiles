import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../entities/doc';
import {Observable} from 'rxjs';
import {Links} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private https:HttpClient) { }

  public pushTextDoc(doc: Doc): Observable<string>{
    return this.https.post<string>(Links.API_URL + "local/text",doc)
  }

  public pushDirDoc(doc: Doc): Observable<string>{
    return this.https.post<string>(Links.API_URL + "local/dir",doc)
  }

  public pushImageDoc(doc: Doc): Observable<string>{
    return this.https.post<string>(Links.API_URL + "local/image",doc)
  }
}
