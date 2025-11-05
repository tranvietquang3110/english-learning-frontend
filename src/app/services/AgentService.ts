import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PronunciationRequest } from '../models/request/pronunciation-request.model';
import { PronunciationResponse } from '../models/response/pronunciation-response.model';
import { GetPronunciationResponse } from '../models/response/get-pronunciation-response.model';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = `${environment.apiAgentServiceUrl}`;

  constructor(private http: HttpClient) {}

  pronounce(request: PronunciationRequest): Observable<PronunciationResponse> {
    const formData = new FormData();
    formData.append('text', request.text);
    formData.append('file', request.file);
    return this.http.post<PronunciationResponse>(
      `${this.apiUrl}/pronunciation`,
      formData
    );
  }

  getPronunciation(text: string): Observable<GetPronunciationResponse> {
    return this.http.post<GetPronunciationResponse>(
      `${this.apiUrl}/pronunciation/${text}`,
      {}
    );
  }
}
