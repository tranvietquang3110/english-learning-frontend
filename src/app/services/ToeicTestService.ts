import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { ToeicTestGroupResponse } from '../models/response/toeic-test-group-response.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToeicTestGroupRequest } from '../models/request/toeic-test-group-request.model';
import { ToeicTestRequest } from '../models/request/toeic-test-request-model';
import { ToeicTestResponse } from '../models/response/toeict-test-response.model';

@Injectable({
  providedIn: 'root',
})
export class ToeicTestService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.apiContentServiceUrl}/toeic`;
  getGroup(
    page: number,
    limit: number
  ): Observable<Page<ToeicTestGroupResponse>> {
    return this.http.get<Page<ToeicTestGroupResponse>>(
      `${this.apiUrl}/groups?page=${page}&limit=${limit}`
    );
  }

  addGroup(group: ToeicTestGroupRequest): Observable<ToeicTestGroupResponse> {
    return this.http.post<ToeicTestGroupResponse>(
      `${this.apiUrl}/groups`,
      group
    );
  }

  updateGroup(
    id: string,
    group: ToeicTestGroupRequest
  ): Observable<ToeicTestGroupResponse> {
    return this.http.put<ToeicTestGroupResponse>(
      `${this.apiUrl}/groups/${id}`,
      group
    );
  }

  deleteGroup(id: string) {
    return this.http.delete(`${this.apiUrl}/groups/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  getGroupById(id: string): Observable<ToeicTestGroupResponse> {
    return this.http.get<ToeicTestGroupResponse>(`${this.apiUrl}/groups/${id}`);
  }

  addTest(
    test: ToeicTestRequest,
    groupId: string,
    images: File[],
    audios: File[]
  ): Observable<ToeicTestResponse> {
    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(test)], { type: 'application/json' })
    );
    images.forEach((image) => formData.append('images', image));
    audios.forEach((audio) => formData.append('audios', audio));
    return this.http.post<ToeicTestResponse>(
      `${this.apiUrl}/groups/${groupId}/test`,
      formData
    );
  }

  updateTest(
    test: ToeicTestRequest,
    testId: string,
    images: File[],
    audios: File[]
  ): Observable<ToeicTestResponse> {
    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(test)], { type: 'application/json' })
    );
    images.forEach((image) => formData.append('images', image));
    audios.forEach((audio) => formData.append('audios', audio));
    return this.http.put<ToeicTestResponse>(
      `${this.apiUrl}/tests/${testId}`,
      formData
    );
  }

  deleteTest(testId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tests/${testId}`, {
      responseType: 'text' as 'json',
    });
  }

  getTestById(testId: string): Observable<ToeicTestResponse> {
    return this.http.get<ToeicTestResponse>(`${this.apiUrl}/tests/${testId}`);
  }
}
