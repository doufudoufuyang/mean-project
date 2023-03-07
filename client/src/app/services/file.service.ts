import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  fileListService() {
    return this.http.get('http://localhost:3000/user/list')
  }

  fileUpload(fileForm: FormData) {
    console.log('fileForm uploading');
    return this.http.post('http://localhost:3000/user/upload',
      fileForm);
  }


}
