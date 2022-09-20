import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http: HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
   }
  postData(detailsData: any) {
    const headers = new HttpHeaders(
      { 'Content-Type': 'multipart/form-data' }
    );
    return new Promise((resolve, reject) =>{
      this.http.post('http://localhost:80/postData', detailsData)
      .subscribe(res => resolve(res), err => reject(err))
    });
}
}
