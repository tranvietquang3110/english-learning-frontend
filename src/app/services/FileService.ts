import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FileResponse } from '../models/response/file-response.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = `${environment.apiContentServiceUrl}/files`;

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<FileResponse>(`${this.apiUrl}/images`, formData);
  }

  deleteImage(publicId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/images/${publicId}`);
  }
}
