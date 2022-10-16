import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: any) {
    let urlAPI = 'http://localhost:3000/api/uploadPicture';
    return this.http.post(urlAPI, formData);
  }
}
