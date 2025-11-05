import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StatisticResponse } from '../models/response/statistic-response.model';
import { Observable } from 'rxjs';
import { TopicViewSummaryResponse } from '../models/response/topic-view-summary-response.model';

export enum TimeRange {
  TODAY = 'TODAY',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
  TWELVE_MONTHS = 'TWELVE_MONTHS',
  ALL = 'ALL',
}

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private apiUrl = environment.apiContentServiceUrl + '/statistic';
  constructor(private http: HttpClient) {}
  getTopicViews(timeRange: TimeRange): Observable<StatisticResponse> {
    return this.http.get<StatisticResponse>(
      `${this.apiUrl}/topic-view?time_range=${timeRange}`
    );
  }
  getTopicViewsSummary(top: number): Observable<TopicViewSummaryResponse[]> {
    return this.http.get<TopicViewSummaryResponse[]>(
      `${this.apiUrl}/top-topic-view?top=${top}`
    );
  }
}
