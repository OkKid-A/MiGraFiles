import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doc} from '../entities/doc';
import {Links} from '../shared/links';
import {LocalVariableNames} from '../shared/local-variable-names';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private https:HttpClient) {}

  public findDocsByPath(path : string): Observable<Doc[]>{
    const id = localStorage.getItem(LocalVariableNames.LOCAL_USER);
    return this.https.get<Doc[]>(Links.API_URL+"doc/author?id="+id+"&path="+path);
  }

  public updateDocContent(doc : Doc):Observable<string>{
    const docSent = {
      content: doc.content,
      author: doc.author,
      url: doc.url
    }
    return this.https.post<string>(Links.API_URL+"doc/save",docSent);
  }

  public updateDocImage(image:string, author:string, url:string):Observable<string>{
    const docSent = {
      image: image,
      author: author,
      url: url
    }
    return this.https.put<string>(Links.API_URL+"doc/save",docSent);
  }

  public deactivateDoc(author:string, url:string, type:string):Observable<any>{
    const docSent={
      author:author,
      url:url,
      type:type
    }
    return this.https.put<any>(Links.API_URL+"doc/deactivate",docSent);
  }

  public copiarDoc(author:string, url:string, type:string, title:string):Observable<string>{
    const docSent={
      author:author,
      url:url,
      type:type,
      title:title
    }
    return this.https.post<string>(Links.API_URL+"doc/copy",docSent);
  }
}
