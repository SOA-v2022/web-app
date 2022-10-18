import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    // let urlAPI = 'http://localhost:3000/api/uploadPicture';
    let urlAPI = 'http://localhost:3000/uploadPicture';
    return this.http.post(urlAPI, formData);
  }
}
